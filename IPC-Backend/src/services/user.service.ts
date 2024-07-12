import { injectable } from "inversify";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { userModel } from "../models";
import config from 'config';
import { IuserModel } from "../interfaces";
import fs from 'fs';
import path from 'path';

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

    async getUser(id: string): Promise<object>{
        const user = await userModel.findOne({_id: id});
        return {status: true, data: user};
    }

    async updateProfile(id: string, bodyData: IuserModel):Promise<object>{
        await userModel.findOneAndUpdate({_id:id},{$set: bodyData});
        return {status: true, message: 'User Profile Updated!'};
    }

    async deleteUser(id: string):Promise<object>{
        const user = await userModel.findOne({_id:id}) as any;
        await userModel.findOneAndDelete({_id:id});
        if(fs.existsSync(path.join(__dirname, '..','..','public','profiles', `${user.profile}`))){
            fs.unlink(path.join(__dirname, '..','..','public','profiles', `${user.profile}`),(err:any)=>{
                if(err) throw new Error(err);
            })
        }
        return {status: true, message : 'User Deleted!!'};
    }

    async getOtp(email: string):Promise<object>{
        const founduser = await userModel.findOne({email: email});
        if(founduser){
            const otp = Math.floor(1000 + Math.random() * 9000);
            await userModel.findOneAndUpdate({_id:founduser._id},{$set : {otp : otp}});
            return {status: true, otp: otp};
        }else{
            return {status: false, message: 'user not found please signup!!'};
        }
    }

    async validateOtp(email: string, otp: number): Promise<object>{
        const founduser = await userModel.findOne({email: email}) as IuserModel;
        if(founduser){
            if(otp === founduser.otp){
                const udate = new Date(founduser.updatedAt as any) as any;
                const today = new Date() as any;
                if(today - udate > 30000){
                    await userModel.findOneAndUpdate({_id:founduser._id},{$unset : {otp : {$exists: true}}});
                    return {status: false, message : "OTP Expired!!"};
                }else{
                    await userModel.findOneAndUpdate({_id:founduser._id},{$unset : {otp : {$exists: true}}});
                    return {status: true, message : 'OTP Verified!!'};
                }
            }
            return {status: false, message : "invalid otp!!"};
        }else{
            return {status: false, message: 'invalid otp!!'};
        }
    }

    async changePassword(email: string, pswd: string): Promise<object>{
        await userModel.findOneAndUpdate({email: email}, {$set : {password : pswd}});
        return {status: true, message : 'password updated'};
    }
}