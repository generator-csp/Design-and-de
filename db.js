const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(
            `mongodb+srv://generator-csp:chetna8869@cluster0.alet0au.mongodb.net/`,
            {
                useNewUrlParser: true,
                useUnifiedTopology: true,
            }
        );
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB connection failed:', error.message);
        process.exit(1);
    }
};

module.exports = connectDB;
