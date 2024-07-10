import { injectable } from "inversify";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userModel } from "../models";
import config from 'config';
import { IuserModel } from "../interfaces";

@injectable()
export class userService{
    async login(bodyData: any):Promise<Object>{
        const founduser = await userModel.findOne({email : bodyData.email});
        if(founduser){
            const checkPswd = await bcrypt.compare(bodyData.password, founduser.password);
            if(checkPswd){
                const data = {
                    userId: founduser._id,
                    email : founduser.email,
                    role : founduser.role
                }

                const token = jwt.sign(data, config.get('SECRETE_KEY')) as string;
                await userModel.findOneAndUpdate({_id: founduser._id}, {$set :{token : token}});

                return {status: true, message: 'user loggedin!', token : token, username: founduser.username, role : founduser.role};
            }else{
                return {status: false, message : 'invalid credentials!'};
            }
        }else{
            return {status: false, message : 'user not found, please signup!'}
        }
    }

    async logout(id: string):Promise<Object>{
        await userModel.findOneAndUpdate({_id:id},{$unset : {token :{$exists : true}}});
        return {status: true, message: 'user logout!'};
    }

    async signup(bodyData: IuserModel):Promise<Object>{
        await userModel.create(bodyData);
        return {status: true, message: 'user signuped!'};
    }

    async getUserCount():Promise<object>{
        const count = await userModel.countDocuments({role : 'user'});
        return {status: true, data : count};
    }

    async getAllUsers():Promise<object>{
        const data = await userModel.find({role: 'user'});
        return {status: true, data: data};
    }
}