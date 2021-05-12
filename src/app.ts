import express, {Application} from "express";
import bodyParser from "body-parser";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import path from "path";
import dotenv from "dotenv";
import cors from "cors";
import {globalRouter} from "./routers/globalRouter";
import {userRouter} from "./routers/userRouter";
import {adminRouter} from "./routers/adminRouter";
import {authJwt, localMiddlewares} from "./middlewares";
import "./db";
import "../src/models/fileUrl";
import "../src/models/comment";
import "../src/models/post";
import "../src/models/material";
import "../src/models/user";
import "../src/passport";


dotenv.config();

const app:Application = express();
const port = process.env.PORT || 3000;


app.use(morgan("dev"));
app.use(helmet({contentSecurityPolicy:false}))
app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(authJwt);
app.use(localMiddlewares);
app.set("view engine", "pug");
app.set("views", path.join(__dirname, "views"));
app.use(express.static(path.join(__dirname,"public")));

/*-------Routers-------*/
app.use("/",globalRouter);
app.use("/",userRouter);
app.use("/",adminRouter);


app.listen(port,() => console.log(`[app]: http://localhost:${port}`));
