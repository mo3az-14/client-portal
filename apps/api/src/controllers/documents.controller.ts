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
        return { name: documents[i].name, type: documents[i].type, url: url, key: documents[i].key }
    })
    res.status(200).json({ message: "got all documents uploaded by user" + user.name, files: result_document, })
    return
}
export const deleteDocument = async (req: Request, res: Response) => {
    console.log("incoming request to delete a file")
    console.log(req.body)
    const key = req.body.key
    console.log(key)
    const utdelete = await utapi.deleteFiles(key)
    console.log(utdelete)
    const [dbDeleteResponse] = await db.delete(files).where(eq(key, files.key)).returning({ deletedId: files.id })
    if (dbDeleteResponse.deletedId.length < 1) {
        res.status(400).json({ message: `failed to delete file with key ${key}`, fileKey: key })
    }
    console.log(`deleted file with key ${key}, and ID ${dbDeleteResponse.deletedId}`)
    res.status(200).json({ message: `deleted file with key ${key}, deleted file ID ${dbDeleteResponse.deletedId}`, fileKey: key, fileId: dbDeleteResponse.deletedId })
}
