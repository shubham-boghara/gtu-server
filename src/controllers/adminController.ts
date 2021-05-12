import {Controller} from "../types";
import Posts from "../models/post";
import Material from "../models/material";
import FileUrl from "../models/fileUrl";


export const uploadPost:Controller = (req,res) => {
    res.render("upload")
}

export const postUploadPost:Controller = async (req,res) => {
    const {body:{department,semester,year,type:field,subject,body}} = req;
    const upload = await new Posts({
           department,semester,year,field,subject,body
    });
    upload.save();
    if(upload){
        res.redirect(`/${upload._id}/post`);
    }else {
        res.send(`Server Problem`);
    }

}

export const getMaterial:Controller = async (req,res) => {
    const id = req.params.id;

    try {
        const post = await Posts.findById({_id:id});

        if(post){
            const name = post.subject
            res.render("material",{id,name})
        }
    }catch (err){
        res.status(501).send("Not Found");
    }



}

export const uploadMaterial:Controller = async (req,res) => {
    const {params:{id},body:{name,m_title:title,body}} = req
    console.log(id);
    const postId = await Posts.findById({_id:id});
    if(postId && !(postId.material)){
         const postMaterial = new Material({
             name:postId.subject,
             title:title,
             body:body,
         });
         await postMaterial.save();
         if(postMaterial){
             postId.material = postMaterial._id;
             postId.save();
             res.send("ok");
         }

    }else {
        res.status(501).redirect("/post");
    }


}

export const editPost:Controller = (req,res) => {
    res.render("edit")
}

export const deletePost:Controller = (req,res) => {
    const {params:{id}} = req;
    const deletePost = Posts.findByIdAndDelete({_id:id});
    res.send("Delete Post Successfully");
}

export const profile:Controller = (req, res) => {
    res.render("profile");
}