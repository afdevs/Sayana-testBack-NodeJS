
import { Request, Response } from 'express';
import { Song } from '../models/Song';
import { Bill } from '../models/Bill';

export async function dashboardView(req: Request, res: Response){    
    try {
        const songs= await Song.find({}, {password: 0});
        const bills= await Bill.find({}, {password: 0});
        
        res.render("dashboard", {
            error:false,
            songs,
            bills
            
        });
        
    }  catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
        })
    }
}
