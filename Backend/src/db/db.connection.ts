import mongoose from "mongoose";
import config from "config";

export const connection = async ()=>{
    await mongoose.connect(config.get("MONGO_URL"));
}