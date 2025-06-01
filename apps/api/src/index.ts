import path from 'path'
import dotenv from 'dotenv'
dotenv.config();
import express from 'express';
import { toNodeHandler } from "better-auth/node"; import { auth } from './lib/auth/auth';
import cors from 'cors'
import documentRoutes from "./routes/document.route"
import { uploadRouterHandler } from './routes/uploadthing.route';
export * from "./routes/uploadthing.route"
import type { Session, User } from 'better-auth';
import { logRequest } from './middleware/auth.middleware';
declare module "express-serve-static-core" {
    interface Request {
        session: Session,
        user: User,
    }
}

const PORT = process.env.SERVER_PORT;

const app = express();

app.enable("trust proxy");

console.log(process.env.CLIENT_URL)
app.use(cors());
app.options('*ss', cors());
// app.use('*ssc', logRequest)
app.all("/api/auth/*s", toNodeHandler(auth));

app.use("/api/uploadthing", logRequest, uploadRouterHandler);

app.use(express.json());
app.use('/api', documentRoutes)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../web/dist")));
    app.get('*ssssss', (req, res) => {
        res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
    });

}
app.listen(PORT, () => {
    console.log("server listening on port: " + PORT)
})
export default app 
