import mongoose from "mongoose";
import { IcategoryModel } from "../interfaces";

const categorySchema = new mongoose.Schema<IcategoryModel>({
    name : {
        type : String,
        required : [true, 'category name is required!!'],
        unique : [true, 'category already exists!!']
    },
    description : {
        type : String,
        required : [true, 'category description is required!!']
    }
},{
    timestamps : true
})

categorySchema.pre('save',function(next){
    const lowerName = this.name?.trim()?.toLowerCase();
    this.name = lowerName;
    next();
})

export const categoryModel = mongoose.model('categories', categorySchema);