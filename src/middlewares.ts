import {Controller} from "./types";
import jwt from "jsonwebtoken";


export const localMiddlewares:Controller = (req,res,next) => {

    res.locals.Department = department
    res.locals.Semester = semester
    res.locals.Year = year
    res.locals.Type = type


    next();
}

export const authJwt:Controller = (req, res, next) => {
    const secret = <string>process.env.SECRET;
    const cookies = req.cookies;
    const header = req.headers['cookie']?.split(' ')[0].split("=")[1];

    console.log(header);
    try{
        if(cookies && cookies.token && header){
           const varifecation =  jwt.verify(header,secret);
           console.log(varifecation);
        }
    }catch (err){
        res.status(501).send({err})
    }
   next();
}



 const department:String[] = ["CSE","ME","CIVIL","EC","IT","CHEMICAL"];
 const semester:number[] = [1,2,3,4,5,6,7,8];
 const year:Array<number> = [1,2,3,4];
 const type:Array<String> = ["B-TEACH","BSE"];