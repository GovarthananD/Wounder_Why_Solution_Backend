import express from 'express';
import mongoose from 'mongoose';
import dotenv from 'dotenv';
import cors from 'cors';
import gameRoute from './route/gameRoute.js';

dotenv.config();

const app = express();

app.use(express.json());
app.use(cors());

async function DB (){
    try {
        await mongoose.connect(process.env.MONGO_URL);
        console.log('Database Connected')
    } catch (error) {
        console.log(error.message)
    }
}

DB();

app.use('/games', gameRoute);

app.listen(process.env.PORT, () => console.log(`Server Running on PORT ${process.env.PORT}`));