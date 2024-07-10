import 'reflect-metadata';
import { inject } from 'inversify';
import { controller, httpGet, httpPost } from 'inversify-express-utils';
import { userService } from '../services';
import { Request, Response } from 'express';
import { IuserModel } from '../interfaces/model.interface';
import { loginMiddleware } from '../middleware';

@controller('/user')
export class userController {
    constructor(@inject(userService) private userServices : userService){}

    @httpPost('/signup')
    async signup(req: Request, res: Response){
        try{
            const bodyData = req.body as IuserModel;
            res.json(await this.userServices.signup(bodyData));
        }catch(err: any){
            res.json({status : false, message : err.message})
        }
    }

    @httpPost('/login')
    async login(req: Request, res: Response){
        try{
            const bodyData = req.body;
            res.json(await this.userServices.login(bodyData));
        }catch(err: any){
            res.json({status : false, message : err.message})
        }
    }

    @httpPost('/logout', loginMiddleware)
    async logout(req: Request, res: Response){
        try{
            const id = req.headers.userId as string;
            res.json(await this.userServices.logout(id));
        }catch(err: any){
            res.json({status : false, message : err.message})
        }
    }

    @httpGet('/getUserCount', loginMiddleware)
    async getUserCount(req: Request, res: Response){
        try{
            res.json(await this.userServices.getUserCount());
        }catch(err: any){
            res.json({status : false, message : err.message});
        }
    }
    
    @httpGet('/getAllUsers', loginMiddleware)
    async getAllUsers(req: Request, res: Response){
        try{
            res.json(await this.userServices.getAllUsers());
        }catch(err: any){
            res.json({status : false, message : err.message});
        }
    }
}