import { NextFunction, Response, Request} from 'express';
import jwt from 'jsonwebtoken';
import { jwtConfig } from "../configs/JWT";

export async function destroyJWT(req: Request, res: Response, next: NextFunction){
    const token:string = req.headers.token as string;

    if(token){
        delete req.headers.token;
        delete res.locals.jwt;
        next();
    }else{
        res.status(401).json({
            error: true,
            message: "Le token envoyez n'existe pas "
        })
    }
}