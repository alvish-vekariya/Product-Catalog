import { inject } from "inversify";
import { controller, httpDelete, httpGet, httpPost, httpPut } from "inversify-express-utils";
import { productService } from "../services";
import { Request, Response } from "express";
import { loginMiddleware, upload } from "../middleware";
import { IproductModel } from "../interfaces";

@controller('/product', loginMiddleware)
export class productController{
    constructor(@inject(productService) private productServices: productService){}

    @httpPost('/addProduct', upload.single('file'))
    async addProduct(req: Request, res: Response){
        try{
            let bodyData: IproductModel = {
                name : req.body.name,
                description: req.body.description,
                price : req.body.price,
                category : req.body.category
            }

            if(req.file){
                bodyData = {
                    ...bodyData,
                    image : req.file.filename
                }
            }
            res.json(await this.productServices.addProduct(bodyData));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }
    @httpDelete('/deleteProduct')
    async deleteProduct(req: Request, res: Response){
        try{
            
            res.json(await this.productServices.deleteProduct(req.query.id as string, req.query.imagename as string));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }
    @httpPut('/updateProduct', upload.single('file'))
    async updateProduct(req: Request, res: Response){
        try{
            let bodyData: IproductModel = {
                name : req.body.name,
                description: req.body.description,
                price : req.body.price,
                category : req.body.catogory
            }

            if(req.file){
                bodyData = {
                    ...bodyData,
                    image : req.file.filename
                }
            }
            res.json(await this.productServices.updateProduct(req.query.id as string, bodyData, req.query.imagename as string))
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }
    @httpGet('/getProduct')
    async getProduct(req: Request, res: Response){
        try{
            res.json(await this.productServices.getProduct(req.query.id as string));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }
    @httpGet('/getAllProduct')
    async getAllProduct(req: Request, res: Response){
        try{
            const queryParams = req.query;
            res.json(await this.productServices.getAllProduct(queryParams));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }

    @httpGet('/getProductCount')
    async getProductCount(req:Request, res: Response){
        try{
            res.json(await this.productServices.getProductCount());
        }catch(err:any){
            res.json({status: false, message: err.message});
        }
    }
}