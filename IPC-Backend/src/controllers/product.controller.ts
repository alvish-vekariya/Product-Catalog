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
                price : req.body.price
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
            res.json(await this.productServices.deleteProduct(req.query.id as string));
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
                price : req.body.price
            }

            if(req.file){
                bodyData = {
                    ...bodyData,
                    image : req.file.filename
                }
            }
            res.json(await this.productServices.updateProduct(req.query.id as string, bodyData))
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
            res.json(await this.productServices.getAllProduct());
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }

    @httpGet('/search')
    async searchProducts(req: Request, res: Response){
        try{
            res.json(await this.productServices.search(req.query.search as string));
        }catch(err:any){
            res.json({status: false, message : err.message});
        }
    }

}