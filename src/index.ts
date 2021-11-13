import express from 'express'
import { Routes } from './routes/routes';
import cors from 'cors';
import mongoose from "mongoose";
import { serverConfig } from './configs/server';

const app= express();

const route= new Routes();
app.use(express.json());
app.use(cors());

try {
    (async ()=>{
        const db = await mongoose.connect(`${serverConfig.mongoURI}${serverConfig.mongoDB}`);   
        console.log(
            'Database is connected to:',
            db.connection.host,
            db.connection.name,
        )
    })();

    route.routes(app)

    const port= serverConfig.port || 8000;
    app.listen(port, ()=>{
        console.log(`Server is running on Port: ${port}`);
    })
} catch (error) {
    
}


