import { createRouteHandler, createUploadthing, type FileRouter } from 'uploadthing/express';
import { UploadThingError } from "uploadthing/server";
import { fromNodeHeaders } from "better-auth/node";
import { auth } from "../lib/auth/auth";
import type { Session, User } from "better-auth";
import { files, type DocumentSchema } from '@client-portal/db';
import db from '../lib/db/db';
type CreateDocument = Omit<Extract<DocumentSchema, { mode: 'create' }>, "mode">;
const f = createUploadthing();
export const uploadRouter = {
    videoAndImage: f({
        image: {
            maxFileSize: "4MB",
            maxFileCount: 4,
        },
        video: {
            maxFileSize: "16MB",
            maxFileCount: 10
        },
        blob: { maxFileSize: "8GB", maxFileCount: 10 },
    }).middleware(async ({ req }) => {
        const session = await auth.api.getSession({
            headers: fromNodeHeaders(req.headers)
        })
        if (!session) {
            throw new UploadThingError("Not authnticated");
        }
        req.session = session.session as Session;
        req.user = session.user as User;
        return { user: req.user, session: req.session }
    }).onUploadComplete(async ({ file, metadata }) => {
        const user = metadata.user as User
        if (!file) {
            throw new UploadThingError("no files after uploading")
        }
        const documentToInsert: CreateDocument = { url: file.ufsUrl, key: file.key, name: file.name, type: file.type, uploadedBy: user.id, version: 1 }
        try {
            const newFile = await db.insert(files).values(documentToInsert);
            console.log("successfull document insert. Documet: ")
            console.log(newFile)
        } catch (error) {
            console.log("an error happened while inserting document in database")
            console.log(error)
        }
    }),
} satisfies FileRouter;

export const uploadRouterHandler = createRouteHandler({
    router: uploadRouter,
})
