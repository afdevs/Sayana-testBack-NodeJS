import express from 'express'
import { Routes } from './routes/routes';
import cors from 'cors';
import mongoose from "mongoose";
import { serverConfig } from './configs/server';
import { initDataForTesting } from './utils/utils';
import sessions from 'express-session';
import cookieParser from 'cookie-parser';

var session;

const app= express();

const route= new Routes();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());
app.use(cookieParser());

try {
    (async ()=>{
        console.log(serverConfig.mongoURI)
        const db = await mongoose.connect(`${serverConfig.mongoURI}`);   
        console.log(
            'Database is connected to:',
            db.connection.host,
            db.connection.name,
        )
    })();

    app.set("view engine", "ejs");
    const oneDay = 1000 * 60 * 60 * 24;
    app.use(sessions({
        secret: "supersecrettoken",
        saveUninitialized:true,
        cookie: { maxAge: oneDay },
        resave: false 
    }));

    initDataForTesting();
    route.routes(app)

    const port= serverConfig.port || 8000;
    app.listen(port, ()=>{
        console.log(`Server is running on Port: ${port}`);
    })
} catch (error) {
    
}


