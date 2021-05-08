import {Controller} from "../types";
import Posts from "../models/post";
import user from "../models/user";
import {post} from "../models/types";
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";

/*====== [/][GET][x] =======*/
export const Home:Controller = async (req,res) => {
    //find all post from database
    const post = await Posts.find({}).then(() => {});

    res.render("home",{title:"home",siteName:"GTU",post});
}

/*====== [/login][GET][x] =======*/
export const Login:Controller = ((req, res) => {
    res.render("login",{title:"login",siteName:"GTU"});
})

/*====== [/login][POST][x] =======*/
export const postLogin:Controller = async (req,res) => {
    const {body:{email,password}} = req;
    //Find user by Email
    const findUser = await user.findOne({email});
    //If user not found
    if(!findUser){
        return res.status(400).send("The User Not Found");
    }
    //user hash password
    const s = <string>findUser.hash;
    //sign secret token
    const secret:string = <string>process.env.SECRET
    //user found and check password
    if(findUser && bcryptjs.compareSync(password,s)){
        const token = jwt.sign(
            {
                userId: findUser._id,
                isAdmin: findUser.isAdmin
            },
            secret,
        )
        //set cookie
        res.header('Set-cookie',`token=${token}`);

        res.status(200).redirect("/profile");

    }else {
        //password wrong
        return res.status(400).send("Password is wrong")
    }

}

/*====== [/join][JOIN][x] =======*/
export const Join:Controller = ((req, res) => {
    res.render("join",{title:"join",siteName:"GTU"});
})

/*====== [/join][POST][x] =======*/
export const postJoin:Controller = (async (req, res) => {
    const {body:{name:username,email,password,password2}} = req;
    const secret:string = <string>process.env.SECRET
    //email for assign
    let vEmail:string|null = null;
    //check the email is exist or not
    try{
        const userEmail = await user.findOne({email});

        // if user exist
        if(userEmail) {
            //if user email is same provided email
            if (userEmail.email == email) {
                //assign email
                vEmail = email
                res.send("Email already taken");
            }
        }
    }catch (err){
        res.send({err})
    }

    //check the password is same and email is not their->
    if(password==password2 && typeof password == "string" && !vEmail) {
        //hash the password
        const p = bcryptjs.hashSync(password,10);
        //register user in database
        const User = new user({
            username: username.toLowerCase(), email, hash: p
        });
        //save user in database
        await User.save();
        //sign with jwt token
        const token = jwt.sign(
            {
                name:User.username,
                userId:User._id,
                isAdmin:User.isAdmin
            },
            secret
        );
        //set cookie
        res.header('Set-cookie',`token=${token}`);
        //go to profile
        res.redirect("/profile");

    }else {
        //password is wrong
        return res.status(400).send("Password is wrong")

    }
})

/*====== [/search][GET][x] =======*/
export const Search:Controller = (async (req, res) => {
    const {query:{department,semester,year,type}} = req;
    //semester string
    const s = parseInt(<string>semester)
    //year Int
    const y = parseInt(<string>year)
    //assign post data
    let findPost: post[] = [];

    if(typeof department=="string" && typeof type=="string"){
    try{
         //find post by semester,password,year,department,field
         findPost = await Posts.find({department,semester:s,year:y,field:type});
         console.log(findPost);
    }catch (e){
        res.status(501).send({e})
    }
}

    res.render("search",{title:"search",siteName:"GTU",findPost});
})

