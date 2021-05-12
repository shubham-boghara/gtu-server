import {Controller} from "../types";
import Posts from "../models/post";
import {fileUrl, post,comment} from "../models/types";
import Comment from "../models/comment";


export const findThis:Controller = async (req,res) => {
    const {params: {id, name}} = req;
    let postId
    let files: fileUrl[]= [];
    let comments:comment[] = [];
    try {
        const getPost = await Posts.findOne({_id: id, subject: name}).populate({
            path: "material",
            populate: {path: 'fileUrl'}
        }).populate("comments");
        if(getPost){
            files = getPost.material.fileUrl;
            comments = getPost.comments;
            postId = getPost._id;
            let material = getPost.material;
            res.render("page", {title: "page", siteName: "GTU", postId,files,comments,name,material});

        }else{
            res.send(`Post not found`);
        }

    } catch (err) {
        res.send({err});
    }
}

export const postComments:Controller = async (req,res)  => {
    const {params: {id}, body: {comment:text, name}} = req;
    const post = await Posts.findById({_id: id});
    if (post) {
        const comments = await new Comment({
            name, text
        });
        await comments.save();
        await post.comments.push(comments._id);
        await post.save();
      res.redirect(`/subject/${post.subject}/${id}`);
    } else {
        res.status(501).send("post is not found")
    }
}

