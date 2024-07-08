import { injectable } from "inversify";
import { productModel } from "../models/product.model";

@injectable()
export class productService{
    async addProduct(data: any):Promise<object>{
        await productModel.create(data);
        return {status: true, message: 'product added!!'};
    }

    async deleteProduct(id: string):Promise<object>{
        await productModel.findOneAndDelete({_id : id})
        return {status: true, message: 'product deleted!!'}
    }
    async updateProduct(id: string, data: any):Promise<object>{
        await productModel.findOneAndUpdate({_id: id},{$set : data})
        return {status: true, message: 'product updated!!'}
    }
    async getProduct(id: string):Promise<object>{
        const product = await productModel.find({_id: id})
        return {status: true, data : product};
    }
    async getAllProduct():Promise<object>{
        const products = await productModel.find({})
        return {status: true, data : products};
    }
    
}