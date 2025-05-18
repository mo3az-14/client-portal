import path from 'path'
import express from 'express';
import dotenv from 'dotenv'
import { toNodeHandler } from "better-auth/node"; import { auth } from './lib/auth/auth';
import cors from 'cors'
import documentRoutes from "./routes/document.route"
import { uploadRouterHandler } from './routes/uploadthing.route';
export * from "./routes/uploadthing.route"
import type { Session, User } from 'better-auth';
declare module "express-serve-static-core" {
    interface Request {
        session: Session,
        user: User,
    }
}
dotenv.config();

const PORT = process.env.SERVER_PORT;

const app = express();

app.use(express.static(path.join(__dirname, "../../web/dist")));
app.use(cors({
    origin: process.env.CLIENT_URL,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));
app.options('*ss', cors());
app.all("/api/auth/*s", toNodeHandler(auth));

app.use(express.json());
app.use('/api', documentRoutes)
app.use("/api/uploadthing", uploadRouterHandler);
app.listen(PORT, () => {
    console.log("server listening on port: " + PORT)
})
export default app 
