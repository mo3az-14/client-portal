import express from 'express';
import dotenv from 'dotenv'
import { toNodeHandler } from "better-auth/node";
import { auth } from '@/lib/auth/auth';
import cors from 'cors'
dotenv.config();

const PORT = process.env.SERVER_PORT;

const app = express();

// solve cors errors 
app.use(cors({
    origin: 'http://localhost:' + process.env.CLIENT_PORT,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
app.options('*ss', cors());

// better auth mount handler 
app.all('/api/auth/*splat', toNodeHandler(auth));

app.use(express.json());

app.listen(PORT, () => {
    console.log("listening on port :" + PORT)
})
