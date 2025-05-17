import type { Response, Request } from 'express'
import db from '../lib/db/db';
import { files, type DocumentSchema } from '@client-portal/db';
import { eq } from 'drizzle-orm';
import { UTApi } from 'uploadthing/server';
type CreateDocument = Omit<Extract<DocumentSchema, { mode: 'create' }>, "mode">;

const utapi = new UTApi()


export const getAllUploadedDocuments = async (req: Request, res: Response) => {
    const user = req.user;
    const documents = await db.select().from(files).where(eq(files.uploadedBy, req.user.id))
    if (!documents.length) {
        res.status(204).json({ message: "No files found for this user" })
        return
    }
    let urls = documents.map((file) => {
        if (file.key) {
            const url = utapi.generateSignedURL(file.key, { expiresIn: "1 day" })
            return url;
        }
    })
    const result_url = (await Promise.all(urls)).map((obj) => obj?.ufsUrl);
    const result_document = result_url.map((url, i) => {
        return { name: documents[i].name, type: documents[i].type, url: url }
    })
    res.status(200).json({ message: "got all documents uploaded by user" + user.name, files: result_document, })
    return
}
