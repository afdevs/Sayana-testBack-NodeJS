import { Request, Response } from "express";

export async function login(req: Request, res: Response){
    res.status(401) .json({
        error:'',
        message: 'login',
        tokens:{

        }
    })
}

export async function register(req: Request, res: Response){
    res.status(401).json({
        error:'',
        message: 'register',
        tokens:{
        
        }
        
    })
}

export async function update(Req: Request, res: Response){
    res.status(401).json({
        error:'',
        message: 'update',
        
    })
}

export async function getAll(Req: Request, res: Response){
    res.status(401).json({
        error:'',
        users: ['users']
        
    })
}

export async function get(Req: Request, res: Response){
    res.status(401).json({
        error:'',
        users: {
            fisrtname: 'Ferdo'
        }
        
    })
}

export async function remove (Req: Request, res: Response){
    res.status(401).json({
        error:'',
        message: 'remove'
        
    })
}
