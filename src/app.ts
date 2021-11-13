import express from 'express'
import { Routes } from './routes/routes';
import cors from 'cors';
import mongoose from "mongoose";
import dotenv from 'dotenv';
dotenv.config();

const app= express();

const routes= new Routes();

app.use(cors());

try {
    (async ()=>{
        const db = await mongoose.connect(`${process.env.MONGO_URI}`);
        db.set('debug', true);
        console.log(
            'Database is connected to:',
            db.connection.host,
            db.connection.name,
        )
    })();

    routes.routes(app)

    const port= process.env.PORT || 8000;
    app.listen(port, ()=>{
        console.log(`Server is running on Port: ${port}`);
    })
} catch (error) {
    
}


