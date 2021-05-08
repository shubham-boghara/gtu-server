import {Controller} from "../types";
import Posts from "../models/post";
import {fileUrl, post,comment} from "../models/types";
import Comment from "../models/comment";


export const findThis:Controller = async (req,res) => {
    const {params: {id, name}} = req;
    let post = {};
    let files: fileUrl[]= [];
    let comments:comment[] = [];
    try {
        const getPost = await Posts.find({_id: id, subject: name}).populate({
            path: "material",
            populate: {path: 'fileUrl'}
        }).populate("comments");
        post = getPost[0].material[0]
        files = getPost[0].material[0].fileUrl;
        comments = getPost[0].comments
        res.render("page", {title: "page", siteName: "GTU", post,files,comments,name});

    } catch (err) {
        res.send({err});
    }
}

export const postComments:Controller = async (req,res)  => {
    const {params: {id}, body: {text, name}} = req;
    const post = await Posts.findById({_id: id});
    if (post) {
        const comments = await new Comment({
            name, text
        });
        await comments.save();
        await post.comments.push(comments._id);
        await post.save();
        res.send("ok");
    } else {
        res.status(501).send("post is not found")
    }
}

