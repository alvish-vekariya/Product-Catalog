import { injectable } from "inversify";
import { categoryModel, productModel } from "../models";
import mongoose from "mongoose";
import fs from 'fs';
import path from 'path'

@injectable()
export class categoryService{

    async addCategory(bodyData: any):Promise<object>{
        await categoryModel.create(bodyData);
        return {status: true, message : "category added!"}
    }
    
    async deleteCategory(id: string):Promise<object>{
        await categoryModel.findOneAndDelete({_id: id});
        const images = await productModel.aggregate([
            {
              $match: {
                category : new mongoose.Types.ObjectId(id)
              }
            },
            {
              $group: {
                _id: '$category',
                images : {$push : '$image'}
              }
            },
            {
                $project : {
                    _id:0,
                    images : 1
                }
            }
          ])
          images[0].images.forEach((e: string) => {
            fs.unlink(path.join(__dirname, '..', '..', 'public', 'uploads', e), (e)=>{});
          });
          
        await productModel.deleteMany({category : new mongoose.Types.ObjectId(id)});
        return {status: true, message : "category deleted!"}
    }

    async getAllCategory():Promise<object>{
        const data = await categoryModel.find({});
        return {status: true, data:data};
    }

    async updateCategory(id: string, bodyData: any):Promise<object>{
        await categoryModel.findOneAndUpdate({_id:id},{$set: bodyData});
        return {status: true, message : 'category updated!'}
    }

    async getCategory(id: string): Promise<object>{
        const data = await categoryModel.findOne({_id:id});
        return {status : true, data: data};
    }

    async getCategoryCount():Promise<object>{
        const count = await categoryModel.countDocuments();
        return {status: true, data: count};
    }

}