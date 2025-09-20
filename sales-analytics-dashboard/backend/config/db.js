const mongoose = require('mongoose');
require('dotenv').config(); // Ensures environment variables are loaded

const connectDB = async () => {
  try {
    // Attempt to connect to the MongoDB cluster
    await mongoose.connect(process.env.MONGO_URI);
    
    console.log('MongoDB Connected successfully... 🚀');
  } catch (err) {
    // Log the error and exit the process if the connection fails
    console.error(`Error connecting to MongoDB: ${err.message}`);
    process.exit(1); // Exit process with failure
  }
};

module.exports = connectDB;