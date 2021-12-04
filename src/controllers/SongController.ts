
import { Request, Response } from 'express';
import { Song } from '../models/Song';

export async function getAll(req: Request, res: Response){
    try {
        const songs= await Song.find({}, {password: 0});
        
        res.status(200).json({
            error:false,
            songs
            
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
        const song= await Song.findOne({_id: req.params.id});

        res.status(200).json({
            error: false,
            song
            
        })
    } catch (error: any) {
        res.status(401).json({
            error: true,
            message: error.message,
        })
    }
}
