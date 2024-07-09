import mongoose from "mongoose";
import { IproductModel } from "../interfaces";

const productSchema = new mongoose.Schema<IproductModel>({
    name : {
        type : String,
        required : [true, 'product name is required!!']
    },
    price : {
        type: Number,
        required : [true, 'product price is required!!']
    },
    description : {
        type : String,
        required : [true, 'product description is required!!']
    },
    image : {
        type : String,
        required : [true, 'product image is required!!']
    },
    category : {
        type : mongoose.Schema.Types.ObjectId,
        required : [true, 'category is required'],
        ref: 'categories'
    }
},{
    timestamps: true
})

export const productModel = mongoose.model('products', productSchema);