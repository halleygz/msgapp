import mongoose from "mongoose";
const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
    } catch (error) {
        console.log("couldn't connect mongo", error.message);
        
    }
}