import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config(); // Load environment variables from .env file

const connectDB = async () => {
    try {
        const URL = process.env.MONGO_URI; // Use your MongoDB URI from .env
        await mongoose.connect(URL, {
            ssl: true, // Ensure SSL is enabled if using Atlas
        });
        console.log("MongoDB connected!");
    } catch (error) {
        console.error("MongoDB connection error:", error);
        process.exit(1); // Exit process with failure
    }
};

export default connectDB;