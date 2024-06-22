import mongoose from "mongoose";
import { DATABASE_NAME } from "../constants.js";

const connectDb = async ()=>{
    try {
        const connectionInstance = await mongoose.connect(`${process.env.MONGODB_URI}/${DATABASE_NAME}`);
        console.log(`Connected to DB with host ${connectionInstance.connection.host}`);
    } catch (error) {
        console.log("An error occured while connecting to mongodb");
        process.exit(1);
    }
}

export default connectDb;