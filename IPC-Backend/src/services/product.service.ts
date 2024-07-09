import { injectable } from "inversify";
import { productModel } from "../models/product.model";
import { IproductModel } from "../interfaces";
import fs from 'fs';
import path from 'path';
import mongoose from "mongoose";

@injectable()
export class productService{
    async addProduct(data: any):Promise<object>{
        await productModel.create(data);
        return {status: true, message: 'product added!!'};
    }

    async deleteProduct(id: string, imagename: string):Promise<object>{
    
        fs.unlink(path.join(__dirname,'..','..','public','uploads',imagename),(err:any)=>{})
        
        await productModel.findOneAndDelete({_id : id})
        return {status: true, message: 'product deleted!!'};
    }
    async updateProduct(id: string, data: any, imagename:string):Promise<object>{
        if(data.image){
            fs.unlink(path.join(__dirname,'..','..','public','uploads',imagename),(err:any)=>{
            })
        }
        await productModel.findOneAndUpdate({_id: id},{$set : data})
        return {status: true, message: 'product updated!!'}
    }
    async getProduct(id: string):Promise<object>{
        const product = await productModel.findOne({_id: id})
        return {status: true, data : product};
    }
    async getAllProduct(queryParams: any):Promise<object>{
        let pipeline: any = [
            {
                $lookup: {
                  from: "categories",
                  localField: "category",
                  foreignField: "_id",
                  as: "category_details"
                }
              },
              {
                $unwind: {
                  path: "$category_details"
                }
              },
              {
                $project: {
                  name:1,
                  description:1,
                  updatedAt:1,
                  createdAt:1,
                  price:1,
                  image:1,
                  category :1,
                  category_name:'$category_details.name',
                  _id:1
                }
              }
        ];
        queryParams.filter ? pipeline = [...pipeline, {$match : {category : new mongoose.Types.ObjectId(queryParams.filter)}}] : [];
        queryParams.search ? pipeline = [...pipeline, {$match : {$or : [{name : {$regex : queryParams.search, $options:'i'}}, {description : {$regex : queryParams.search, $options:'i'}}]}}] : [];

        const products = await productModel.aggregate(pipeline);
        
        return {status: true, data : products};
    }

    async getProductCount():Promise<object>{
        const count = await productModel.countDocuments();
        return {status: true, data: count};
    }
}