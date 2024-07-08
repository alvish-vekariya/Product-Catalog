import { Request, Response, NextFunction } from "express";
import { ParamsDictionary } from "express-serve-static-core";
import { injectable } from "inversify";
import { BaseMiddleware } from "inversify-express-utils";
import jwt, { JsonWebTokenError, JwtPayload } from "jsonwebtoken";
import { ParsedQs } from "qs";
import config from 'config';

@injectable()
export class loginMiddleware extends BaseMiddleware{
    handler(req: Request<ParamsDictionary, any, any, ParsedQs, Record<string, any>>, res: Response<any, Record<string, any>>, next: NextFunction): void {
        if(req.headers.authorization){
            const token = req.headers.authorization.split(' ')[1] as string;
            try{
                const tokenData = jwt.verify(token, config.get('SECRETE_KEY')) as JwtPayload;

                req.headers = {
                    ...req.headers,
                    userId: tokenData.userId,
                    email : tokenData.email
                }
                next();

            }catch(err: any){
                if(err instanceof JsonWebTokenError){
                    res.json({status: false, message :"login again!"});
                }else{
                    res.json({status: false, message : err.message});
                }
            }

        }else{
            res.json({status: false, message : 'provide token!'})
        }
    }
}