import mongoose from "mongoose";
const connectDb= async ()=>{
    try {
        await mongoose.connect(process.env.DATABASE_URL);
        console.log("mongodb connected successfully")
    } catch (error) {
        console.log("error while connecting to db")
    }
}
export default connectDb;