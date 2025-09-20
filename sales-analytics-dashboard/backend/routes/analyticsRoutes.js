const express = require('express');
const router = express.Router();
const { getAnalytics } = require('../controllers/analyticsController.js');

// @route   GET /api/analytics
// @desc    Get sales analytics data based on date range
router.get('/', getAnalytics);

module.exports = router;