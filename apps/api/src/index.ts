import path from "path"
import dotenv from 'dotenv';
dotenv.config({ path: path.resolve(__dirname, '../../../.env') });
import express from 'express';
import { toNodeHandler } from "better-auth/node"; import { auth } from './lib/auth/auth';
import cors from 'cors'
import documentRoutes from "./routes/document.route"
import { uploadRouterHandler } from './routes/uploadthing.route';
export * from "./routes/uploadthing.route"
import type { Session, User } from 'better-auth';
import { env } from './config';
import { logRequest } from "./middleware/auth.middleware";
declare module "express-serve-static-core" {
    interface Request {
        session: Session,
        user: User,
    }
}

const PORT = env.SERVER_PORT;

const app = express();

app.use(cors({
    origin: [process.env.CLIENT_URL!, "http://localhost:4001"],
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
}));

app.options('*ss', cors());
app.all("/api/auth/*s", toNodeHandler(auth));


app.use(express.json());
app.use('/api', logRequest, documentRoutes)
app.use("/api/uploadthing", logRequest, uploadRouterHandler);

app.use(express.static(path.join(__dirname, "../../web/dist")));
app.get("/*splats", (req, res) => {
    res.sendFile(path.resolve(__dirname, "../../web/dist/index.html"))
})

app.listen(PORT, () => {
    console.log("server listening on port: " + PORT)
})
export default app 
