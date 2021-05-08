import { NextFunction, Request, Response, RequestHandler } from "express";

export type Controller = (
    req: Request,
    res: Response,
    next: NextFunction
) => any;
