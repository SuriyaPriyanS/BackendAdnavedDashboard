import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import connectDB from './Databases/Config.js';
import clientRouter from './Routes/client.js';
import generalRouter from './Routes/general.js';

import managementRouter from './Routes/mangement.js';
import salesRouter from './Routes/sales.js';
import userRouter from './Routes/UserRouter.js';
import {dataUser,
    dataProduct,
    dataProductStat,
    dataTransaction,
    dataOverallStat,
    dataAffiliateStat} from './controllers/data/index.js';
import helmet from 'helmet';
import morgan from 'morgan';
import bodyParser from 'body-parser';


dotenv.config();

connectDB();

const app = express();
app.use(cors());
app.use(express.json());
app.use(helmet());
app.use(helmet.crossOriginResourcePolicy({policy: "cross-origin"}));
app.use(morgan("common"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));


app.get("/", (req,res)=> {
    res.send("API is running");
})


app.use('/api', clientRouter);
app.use('/api', generalRouter);
app.use('/api', managementRouter);
app.use('/api', salesRouter);
app.use('/api', userRouter);

const PORT = process.env.PORT || 5000;
app.listen(PORT, ()=> {
    console.log(`Servering running on port ${PORT}`);
});


