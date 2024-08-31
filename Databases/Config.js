import mongoose from "mongoose";
import dotenv from "dotenv";


dotenv.config();

const mongodb_url = process.env.MONGODB_URL;

const connectDB = async (req,res)=> {
    try {
        const connection = await mongoose.connect(mongodb_url);
        console.log(`MongoDB Connected to successfully`);
        return connection;
    } catch (error) {
        console.log(`Error connecting to MongoDB: ${error.message}`);
        process.exit(1);
        
    }
}


export default connectDB;

