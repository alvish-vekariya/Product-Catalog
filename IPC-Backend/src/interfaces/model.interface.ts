import mongoose from "mongoose";

export interface IuserModel {
    username : string,
    password: string,
    role : string,
    email : string | undefined,
    _id?: mongoose.Schema.Types.ObjectId,
    createdAt ?: Date,
    updatedAt ?: Date
}

export interface IproductModel{
    name: string,
    description :string,
    price: number,
    image ?: string,
    _id?: mongoose.Schema.Types.ObjectId,
    createdAt ?: Date,
    updatedAt ?: Date
}