import { type Request, type Response, type NextFunction } from 'express';
import { auth } from "../lib/auth/auth";
import { fromNodeHeaders } from "better-auth/node";
import type { Session, User } from 'better-auth';


export const protetctedRoute = async (req: Request, res: Response, next: NextFunction) => {
    let session = await auth.api.getSession({
        headers: fromNodeHeaders(req.headers),
    })
    if (session === null) {
        res.status(401).json({ "message": "[UNAUTHORIZED] please login." })
        return
    }
    req.session = session.session as Session;
    req.user = session.user as User;
    next();
}
export const logRequest = (req: Request, res: Response, next: NextFunction) => {
    console.log(req.headers.cookie)
    next()
}
