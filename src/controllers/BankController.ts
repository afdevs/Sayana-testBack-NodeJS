
import { Request, Response } from 'express';
import { BankCard } from '../models/BankCard';
import { IBankCard } from '../interfaces/BankCard';
import { User } from '../models/User';


export async function saveBankCard(req: Request, res: Response){
    const data = req.body as IBankCard;
    data.user=res.locals.jwt.id;
    try {
        if(!isBankDataValidate(data)){
            throw new Error("Une ou plusieurs des données obligatoire sont manquantes");
        }
        const addedCardBank= await BankCard.create({
            ...data
        })
        console.log(addedCardBank);
        
        const userUpdated= await User.updateOne({email: res.locals.jwt.email}, {
            $push: {
                bankCards: [addedCardBank._id]
            }
        })
        res.status(200).json({
            error: false,
            message: "Vos données bancaire ont été mise à jour",
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
        const banks= await BankCard.find({}, {password: 0}).populate({
            path: 'user'
        });
        
        res.status(200).json({
            error:false,
            banks
            
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
        const bank= await BankCard.findOne({_id: req.params.id});

        res.status(200).json({
            error: false,
            bank
            
        })
    } catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
        })
    }
}


//Validation
const isBankDataValidate=(bankCard: IBankCard):boolean=>{
    const missingData=false;
    if(!bankCard.cardNumber || !bankCard.month || !bankCard.year) return false
    return (bankCard.cardNumber>0 && bankCard.month !=="" && bankCard.year !=="");
}   