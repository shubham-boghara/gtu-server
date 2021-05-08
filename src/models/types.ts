import {Document} from "mongoose";

export interface post extends Document {
    department: String,
    year: Number,
    semester: Number,
    title: String,
    field: String,
    body: String,
    subject: String,
    comments:[comment],
    material:[material]

}
export interface comment extends Document{
    name:String,
    text:String
}

export interface material extends Document{
    name:String,
    title:String,
    body:String,
    fileUrl:[fileUrl]
}

export interface fileUrl extends Document{
    name:String,
    link:String
}