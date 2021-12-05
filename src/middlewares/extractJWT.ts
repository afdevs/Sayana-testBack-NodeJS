import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { jwtConfig } from "../configs/JWT";

export async function validateToken(req: Request, res: Response, next: NextFunction){
    const authHeader:string = req.headers.authorization as string;
    const token=authHeader && authHeader.split(' ')[1];
    console.log('token', authHeader)
    if(token){
        jwt.verify(token, jwtConfig.secret, (error, decoded)=>{
            if(error){
                res.status(401).json({
                    error: true,
                    message: "Le token envoyez n'est pas conforme"
                })
            }else{
                res.locals.jwt= decoded
                next();
            }
         }
        )
    }else{
        res.status(401).json({
            error: true,
            message: "Le token envoyez n'existe pas "
        })
    }
}