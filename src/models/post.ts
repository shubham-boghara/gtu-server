import {Schema,Model,model} from "mongoose";
import * as mongoose from "mongoose";
import {post} from "./types";


const postSchema:Schema<post> = new Schema<post>({
    department: {
        type: String,
        required: true
    },
    year: {
        type: Number,
        required: true
    },
    semester: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        default: ""
    },
    field: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true,
        default: ""
    },
    subject: {
        type: String,
        required: true
    },
    material:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:"materiels"
    }],
    comments:[{
        type:mongoose.Schema.Types.ObjectId,
        required:true,
        ref:"comments"
    }]

});
const Posts:Model<post> = model<post>("posts", postSchema);


export default Posts;