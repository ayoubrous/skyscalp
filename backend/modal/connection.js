const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGOURL);
        console.log("Connected to MongoDB");
    } catch (error) {
        console.log("Error connecting to MongoDB: " + error);
        setTimeout(connectDB, 5000); // Retry connection after 5 seconds
    }
};

module.exports = connectDB;
