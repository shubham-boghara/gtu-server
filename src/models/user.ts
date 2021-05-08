import {Model,model,Schema,Document} from "mongoose";



interface User extends Document {
    username:String,
    hash:String,
    email:String,
    avatarUrl:String,
    googleId:Number,
    isAdmin:Boolean
}

const userSchema:Schema = new Schema({
    username:String,
    email:String,
    hash:String,
    avatarUrl:{type:String,default:""},
    googleId:Number,
    uid:Number,
    isAdmin:{type:Boolean,default:false}
})

const user:Model<User> = model<User>("user",userSchema);

export default user