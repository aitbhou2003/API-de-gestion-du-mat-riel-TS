import { type Request, type Response, type NextFunction } from "express";

export const errorHandler = (err : any , req : Request,res:Response,next : NextFunction) => {

    const statusCode :number= err.statusCode || 500
    const message : string = err.message || "internal server error"

    return res.status(statusCode).json({
        success : false ,
        message : message
    })
    
};
