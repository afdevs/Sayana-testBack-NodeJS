import dotenv from 'dotenv';
dotenv.config();

export const serverConfig={
    mongoURI: process.env.MONGO_URI,
    mongoDB: process.env.MONGO_DB,
    port: process.env.PORT
}