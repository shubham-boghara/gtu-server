import express from "express";
import {
    deletePost,
    editPost,
    getMaterial,
    postUploadPost,
    profile,
    uploadMaterial,
    uploadPost
} from "../controllers/adminController";

export const adminRouter = express.Router();

//uploadPost[GET]
adminRouter.get("/post",uploadPost);
//uploadPost[POST]
adminRouter.post("/post",postUploadPost);
//uploadMaterial[GET]->postId
adminRouter.get("/:id/post",getMaterial);
//uploadMaterial[POST]->postId
adminRouter.post("/:id/post",uploadMaterial);
//editPost[GET]->postId
adminRouter.get("/:id/edit",editPost);
//deletePost[POST]->postId
adminRouter.delete("/:id/delete",deletePost);
//getProfile[GET]->userID
adminRouter.get("/profile",profile);
//postComment[POST]->userID
