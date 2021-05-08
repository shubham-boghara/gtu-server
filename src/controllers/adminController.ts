import {Controller} from "../types";
import Posts from "../models/post";
import Material from "../models/material";
import FileUrl from "../models/fileUrl";


export const uploadPost:Controller = (req,res) => {
    res.render("upload")
}

export const postUploadPost:Controller = async (req,res) => {
    const {body:{department,semester,year,type:field,title,subject,body}} = req;
    const upload = await new Posts({
           department,semester,year,field,title,subject,body
    })
    upload.save((err => {err}))
    res.redirect(`/${upload._id}/post`);
}

export const getMaterial:Controller = async (req,res) => {
    const id = req.params.id;
    try {
        const post = await Posts.findById({_id:id});
        if(post){
            res.render("material",{id})
        }
    }catch (err){
        res.status(501).send("Not Found");
    }



}

export const uploadMaterial:Controller = async (req,res) => {
    const {params:{id},body:{name,m_title:title,body,fileUrl:url,filename}} = req
    console.log(id);
    const postId = await Posts.findById({_id:id});
    if(postId){
            const uploadFile = await new FileUrl({
                name:postId.subject,
                link:url || filename
            })
        uploadFile.save((err => {err}));

        const upload = await new Material({
            name,
            title,
            body,
        })
        upload.fileUrl.push(uploadFile._id)
        upload.save((err => {err}))
        console.log(upload);
        console.log(upload._id);


        if(postId){
            postId.material.push(upload._id);
            postId.save((err => {err}))
            console.log("work");
        }
        console.log(postId);
        res.redirect("/profile")
    }else {
        res.status(501).send("Not Found");
    }


}

export const editPost:Controller = (req,res) => {
    res.render("edit")
}

export const deletePost:Controller = (req,res) => {
    res.send("delete");
}

export const profile:Controller = (req, res) => {
    res.render("profile");
}