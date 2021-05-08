import express from "express";
import {Home, Join, Login, postJoin, postLogin, Search} from "../controllers/globalController";
``

export const globalRouter = express.Router();


globalRouter.get("/",Home);
globalRouter.get("/login",Login);
globalRouter.post("/login",postLogin);
globalRouter.get("/join",Join);
globalRouter.post("/join",postJoin);
globalRouter.get("/search",Search);
