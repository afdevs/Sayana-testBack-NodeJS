import { Request, Response } from "express";
import { User } from "../models/User";
import bcrypt from 'bcryptjs';
import { IUser } from "src/interfaces/User";
import {signJWT} from '../middlewares/signJWT';
import { destroyJWT } from "../middlewares/destroyJWT";

export async function login(req: Request, res: Response){
    const { email, password } = req.body as IUser;
    try {
        if (email==="" || password==="") {
            throw new Error("L'email/password est manquante");
        }
    
        const user = await User.findOne({email: email});
        if(!user){
            throw new Error("L'utilisater n'existe pas");
        }

        const check: boolean = bcrypt.compareSync(password, user.password);
        if(check){
            signJWT(user, (error, token)=>{
                if(error){
                    throw new Error("Une erreur est apparue lors de la génération du token");
                    
                }else if(token){
                    res.status(200).json({
                        error: false,
                        message: "L'utilisateur a été authentifié avec succès",
                        tokens:{
                            token:token,
                            refreshToken: '',
                            createdAt: ''
                        }
                    })
                }
            })
        }else{
            throw new Error("Mot de passe incorrect");
        }
        
    } catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
            tokens:{
                token:'',
                refreshToken: '',
                createdAt: ''
            }
        })
    }
}

export async function register(req: Request, res: Response){
    const user = req.body as IUser;  
    try {  
        if(!isUserDataValidate(user)){
            throw new Error("L'une ou plusiseurs des données obligatoire sont manquantes");
        }

        const isUserExist= await User.findOne({email: user.email});
        if(isUserExist){
            throw new Error("Votre email n'est pas correcte");
        }
        const hashedPassword = bcrypt.hashSync(user.password, 10);

        await User.create({
            ...user,
            date_naissnace: new Date(user.date_naissance),
            password: hashedPassword,
        });

        signJWT(user, (error, token)=>{
            if(error){
                throw new Error("Une erreur est apparue lors de la génération du token");
                
            }else if(token){
                res.status(20).json({
                    error: false,
                    message: "L'utilisateur a été créé avec succès et un token viens de lui est attribué",
                    tokens:{
                        token:token,
                        refreshToken: '',
                        createdAt: Date.now()
                    }
                })
            }
        });

        res.status(201).json({
            error:false,
            message: "L'utilisateur a bien été créé avec succès",
            tokens: {
                token:'',
                refreshToken: '',
                createdAt: Date.now()
            }
        })
    } catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
            tokens:{
                token:'',
                refreshToken: '',
                createdAt: ''
            }
        })
    }
}

export async function update(req: Request, res: Response){
    const { firstname, lastname, date_naissance } = req.body as IUser;
    try {
        const isUserExist= await User.findOne({email: res.locals.jwt.email});

        if(!isUserExist){
            throw new Error("Utilisateur non trouvé");
        }

        const userUpdated= await User.updateOne({email: res.locals.jwt.email}, {
            $set: {
                firstname, 
                lastname, 
                date_naissance
            }
        })
        res.status(200).json({
            error: false,
            message: "L'utilisateur a bien été modifié avec succès",
        })
    } catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
        })
    }
}

export async function getAll(req: Request, res: Response){
    try {
        const users= await User.find({}, {password: 0});
        
        res.status(200).json({
            error:false,
            users
            
        })
    }  catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
        })
    }
}

export async function get(req: Request, res: Response){
    try {
        const user= await User.findOne({email: res.locals.jwt.email}, {password: 0});

        res.status(200).json({
            error: false,
            user: user
            
        })
    } catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
        })
    }
}

export async function remove (req: Request, res: Response){
    try {
        const isUserExist= await User.findOne({email: res.locals.jwt.email});

        if(!isUserExist){
            throw new Error("Utilisateur non trouvé");
        }

        const userDeleted= await User.deleteOne({email:res.locals.jwt.email});
        res.status(200).json({
            error:false,
            user: "L'utilisateur a été déconnecté avec succès"
        })
    } catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
        })
    }
}


//Validation
const isUserDataValidate=(user: IUser):boolean=>{
    return (user.lastname!=="" && user.firstname !=="" && user.email !==""  && user.password !=="" );
}   