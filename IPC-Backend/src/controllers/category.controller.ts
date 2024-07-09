import { Request, Response } from "express";
import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { categoryService } from "../services";

@controller('/category')
export class categoryController{
    constructor(@inject(categoryService) private categoryServices: categoryService){
        
    }

    @httpGet('/getAllCategory')
    async getAllCategory(req: Request, res: Response){
        try{
            res.json(await this.categoryServices.getAllCategory());
        }catch(err:any){
            res.json({status: false, message: err.message});
        }

    }

    @httpPost('/addCategory')
    async addCategory(req: Request, res: Response){
        try{
            const bodyData = req.body;
            res.json(await this.categoryServices.addCategory(bodyData));
        }catch(err:any){
            res.json({status: false, message: err.message});
        }
        
    }
    
    @httpGet('/getCategory')
    async getCategory(req: Request, res: Response){
        try{
            res.json(await this.categoryServices.getCategory(req.query.id as string));
        }catch(err: any){
            res.json({status: false, message: err.message});
        }
    }

    @httpDelete('/deleteCategory')
    async deleteCategory(req: Request, res: Response){
        try{
            res.json(await this.categoryServices.deleteCategory(req.query.id as string));
        }catch(err:any){
            res.json({status: false, message: err.message});
        }

    }

    @httpPut('/updateCategory')
    async updatecategory(req: Request, res: Response){
        try{
            res.json(await this.categoryServices.updateCategory(req.query.id as string, req.body))
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }

    @httpGet('/getCategoryCount')
    async getCategoryCount(req: Request, res: Response){
        try{
            res.json(await this.categoryServices.getCategoryCount())
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }
}