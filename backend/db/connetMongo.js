import mongoose from "mongoose";
const connectMongo = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI)
        console.log('connected to mongodb');
        
    } catch (error) {
        console.log("couldn't connect mongo", error.message);
        
    }
}
export default connectMongo;