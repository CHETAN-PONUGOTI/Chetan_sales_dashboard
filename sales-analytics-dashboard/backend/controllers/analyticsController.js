const Sale = require('../models/Sale');
const mongoose = require('mongoose');

exports.getAnalytics = async (req, res) => {
  const { startDate, endDate } = req.query;

  if (!startDate || !endDate) {
    return res.status(400).json({ error: 'Start date and end date are required.' });
  }

  try {
    const start = new Date(startDate);
    const end = new Date(endDate);

    const matchStage = {
      $match: {
        saleDate: { $gte: start, $lte: end },
      },
    };

    // --- Aggregation Pipelines ---

    // 1. Key Metrics (Total Revenue, Total Sales, Avg Order Value)
    const keyMetrics = await Sale.aggregate([
      matchStage,
      {
        $group: {
          _id: null,
          totalRevenue: { $sum: '$totalRevenue' },
          totalSales: { $sum: '$quantity' },
          orderCount: { $sum: 1 },
        },
      },
      {
        $project: {
          _id: 0,
          totalRevenue: 1,
          totalSales: 1,
          avgOrderValue: { $divide: ['$totalRevenue', '$orderCount'] },
        },
      },
    ]);

    // 2. Top 5 Selling Products
    const topProducts = await Sale.aggregate([
      matchStage,
      {
        $group: {
          _id: '$productId',
          totalQuantitySold: { $sum: '$quantity' },
        },
      },
      { $sort: { totalQuantitySold: -1 } },
      { $limit: 5 },
      {
        $lookup: {
          from: 'products',
          localField: '_id',
          foreignField: '_id',
          as: 'productDetails',
        },
      },
      {
        $project: {
          _id: 0,
          productName: { $arrayElemAt: ['$productDetails.name', 0] },
          totalQuantitySold: 1,
        },
      },
    ]);

    // 3. Sales by Region
    const salesByRegion = await Sale.aggregate([
        matchStage,
        {
            $lookup: {
                from: 'customers',
                localField: 'customerId',
                foreignField: '_id',
                as: 'customer'
            }
        },
        { $unwind: '$customer' },
        {
            $group: {
                _id: '$customer.region',
                totalRevenue: { $sum: '$totalRevenue' }
            }
        },
        { $project: { _id: 0, name: '$_id', value: '$totalRevenue' } }
    ]);


    // 4. Sales by Category
    const salesByCategory = await Sale.aggregate([
        matchStage,
        {
            $lookup: {
                from: 'products',
                localField: 'productId',
                foreignField: '_id',
                as: 'product'
            }
        },
        { $unwind: '$product' },
        {
            $group: {
                _id: '$product.category',
                totalRevenue: { $sum: '$totalRevenue' }
            }
        },
        { $project: { _id: 0, name: '$_id', value: '$totalRevenue' } }
    ]);

    res.json({
      keyMetrics: keyMetrics[0] || { totalRevenue: 0, totalSales: 0, avgOrderValue: 0 },
      topProducts,
      salesByRegion,
      salesByCategory
    });
  } catch (error) {
    console.error('Aggregation Error:', error);
    res.status(500).json({ error: 'Server error while fetching analytics.' });
  }
};