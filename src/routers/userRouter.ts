import express from "express";
import {findThis, postComments} from "../controllers/userController";

export const userRouter = express.Router();

userRouter.get("/subject/:name/:id",findThis);
userRouter.post("/:id/comment",postComments)
