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


adminRouter.get("/post",uploadPost);
adminRouter.post("/post",postUploadPost);
adminRouter.get("/:id/post",getMaterial);
adminRouter.post("/:id/uploadM",uploadMaterial);
adminRouter.get("/:id/edit",editPost);
adminRouter.get("/:id/delete",deletePost);
adminRouter.get("/profile",profile);