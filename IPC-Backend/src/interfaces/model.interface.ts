import mongoose from "mongoose";

export interface IuserModel {
    username : string,
    password: string,
    role : string,
    profile : string,
    email : string | undefined,
    _id?: mongoose.Schema.Types.ObjectId,
    createdAt ?: Date,
    updatedAt ?: Date,
    otp: number
}

export interface IproductModel{
    name: string,
    description :string,
    price: number,
    image ?: string,
    _id?: mongoose.Schema.Types.ObjectId,
    createdAt ?: Date,
    category : mongoose.Types.ObjectId,
    updatedAt ?: Date
}

export interface IcategoryModel {
    _id ?: mongoose.Types.ObjectId,
    name : string | undefined,
    description : string,
    createdAt?: Date,
    updatedAt?: Date
}