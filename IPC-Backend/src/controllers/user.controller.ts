import 'reflect-metadata';
import { inject } from 'inversify';
import { controller, httpDelete, httpGet, httpPost, httpPut } from 'inversify-express-utils';
import { userService } from '../services';
import { Request, Response } from 'express';
import { IuserModel } from '../interfaces/model.interface';
import { loginMiddleware, upload, uploadProfiles } from '../middleware';
import bcrypt from 'bcryptjs';
import fs from 'fs';
import path from 'path';

@controller('/user')
export class userController {
    constructor(@inject(userService) private userServices : userService){}

    @httpPost('/signup', uploadProfiles.single('file'))
    async signup(req: Request, res: Response){
        try{
            let bodyData = req.body as IuserModel;
            if(req.file){
                bodyData = {
                    ...bodyData,
                    profile : req.file.filename
                }
            }
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

    @httpGet('/getUser', loginMiddleware)
    async getUser(req: Request, res: Response){
        try{
            res.json(await this.userServices.getUser(req.headers.userId as string));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }
    
    @httpPut('/updateProfile', loginMiddleware, uploadProfiles.single('profile'))
    async updateProfile(req: Request, res: Response){
        try{
            let bodyData = req.body;
            if(bodyData.password){
                const encryptPswd = await bcrypt.hash(bodyData.password, 10);
                bodyData.password = encryptPswd;
            }
            if(req.file){
                bodyData = {
                    ...bodyData,
                    profile : req.file.filename
                }
                if(fs.existsSync(path.join(__dirname, '..','..','public', 'profiles', `${req.query.profile}`))){
                    fs.unlink(path.join(__dirname, '..','..','public', 'profiles', `${req.query.profile}`),(err: any)=>{
                        if(err){
                            throw new Error(err);
                        }
                    })
                }
            }
            
            res.json(await this.userServices.updateProfile(req.headers.userId as string, bodyData));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }
    
    @httpDelete('/deleteUser', loginMiddleware)
    async deleteUser(req: Request, res: Response){
        try{
            res.json(await this.userServices.deleteUser(req.query.id as string));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }

    @httpPost('/getOtp')
    async getOtp(req: Request, res: Response){
        try{
            res.json(await this.userServices.getOtp(req.query.email as string));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }

    @httpPost('/verifyOtp')
    async verifyOtp(req: Request, res: Response){
        try{
            res.json(await this.userServices.validateOtp(req.query.email as string, Number(req.query.otp)));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }

    @httpPut('/changePassword')
    async changePassword(req: Request, res: Response){
        try{
            const newPswd = await bcrypt.hash(req.body.pswd, 10) as string;
            res.json(await this.userServices.changePassword(req.body.email as string, newPswd));
        }catch(err: any){
            res.json({status: false, message : err.message});
        }
    }
}