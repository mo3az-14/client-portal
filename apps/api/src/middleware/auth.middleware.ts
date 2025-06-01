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
    console.log("───── INCOMING WEBHOOK ─────");

    console.log("Method:", req.method);
    console.log("Protocol:", req.protocol);
    console.log("Secure (HTTPS?)", req.secure);
    console.log("Host header:", req.get("Host"));
    console.log("Original URL:", req.originalUrl);
    console.log("Full URL:", req.baseUrl);
    console.log("Path:", req.path);

    console.log("Client IP:", req.ip);
    if (Array.isArray(req.ips) && req.ips.length) {
        console.log("X-Forwarded-For chain:", req.ips);
    }

    console.log("All headers:", req.headers);
    console.log("Content-Type:", req.get("Content-Type"));
    console.log("User-Agent:", req.get("User-Agent"));
    console.log("Signature header:", req.get("X-Signature")); // or whatever your webhook uses

    console.log("Base URL:", req.baseUrl);
    console.log("Route params:", req.params);
    console.log("Query params:", req.query);

    console.log("Parsed body:", req.body);


    if (req.cookies) {
        console.log("Cookies:", req.cookies);
        console.log("Signed cookies:", req.signedCookies);
    }

    console.log("Is AJAX (xhr)?", req.xhr);
    console.log("Accepted response types:", req.accepts());
    console.log("Matched route object:", req.route);

    console.log("───── END DEBUG LOG ─────");
    next()
}
