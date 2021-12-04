
import { Request, Response } from 'express';
import { Bill } from '../models/Bill';

export async function getAll(req: Request, res: Response){
    try {
        const bills= await Bill.find({}, {password: 0});
        
        res.status(200).json({
            error:false,
            bills
            
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
        const bill= await Bill.findOne({_id: req.params.id});

        res.status(200).json({
            error: false,
            bill
            
        })
    } catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
        })
    }
}
