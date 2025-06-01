import path from 'path'
import dotenv from 'dotenv'
dotenv.config();
import express, { type Request, type Response, type NextFunction, type Application } from 'express'
import { toNodeHandler } from "better-auth/node"; import { auth } from './lib/auth/auth';
import cors from 'cors'
import documentRoutes from "./routes/document.route"
import { uploadRouterHandler } from './routes/uploadthing.route';
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

console.log(process.env.CLIENT_URL)

app.use(cors());
app.options('*ss', cors());
//
// app.use('*ssc', logRequest)
app.all("/api/auth/*s", toNodeHandler(auth));

app.use(express.json());
app.use("/api/uploadthing", logRequest, uploadRouterHandler);

app.use('/api', documentRoutes)
if (process.env.NODE_ENV === "production") {
    app.use(express.static(path.join(__dirname, "../../web/dist")));
    app.get('*ssssss', (req, res) => {
        res.sendFile(path.join(__dirname, "../../web/dist/index.html"));
    });

}
app.use(
    (
        err: unknown,
        req: Request,
        res: Response,
        next: NextFunction // still need to include `next` for Express to treat this as an error handler
    ) => {
        // Determine message and stack safely
        const errorMessage: string =
            err instanceof Error ? err.message : String(err);
        const errorStack: string | undefined =
            err instanceof Error ? err.stack : undefined;

        // Log the exact issue (stack + message)
        console.error('🔥 Unhandled error:', {
            message: errorMessage,
            stack: errorStack,
            url: req.originalUrl,
            method: req.method,
        });

        // Send a 400 response with the error message
        res.status(400).json({
            error: errorMessage || 'Bad Request',
        });
    }
); app.listen(PORT, () => {
    console.log("server listening on port: " + PORT)
})
export default app 
