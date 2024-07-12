import mongoose from "mongoose";
import { NextFunction } from "express";
import bcrypt from 'bcryptjs';
import { IuserModel } from "../interfaces";

const userSchema = new mongoose.Schema<IuserModel>({
    username : {
        type: String,
        required: [true, 'username is required!']
    },
    email : {
        type: String,
        required: [true, 'email is required!'],
        unique: [true, 'email must be unique!']
    },
    password :{
        type: String,
        required : [true, 'password is required!']
    },
    role : {
        type: String,
        required : [true, 'role is required!!'],
        enum : ['admin', 'user']
    },
    profile : {
        type : String
    },
    otp : {
        type: Number
    }
},{
    timestamps : true
})

userSchema.pre('save',async function(next){
    try{
        const newPswd = await bcrypt.hash(this.password, 10) as string;
        this.password = newPswd;
        next();
    }catch(err: any){
        console.log(err.message);
    }
});

export const userModel = mongoose.model('users', userSchema);