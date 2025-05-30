import { deleteDocument, getAllUploadedDocuments } from "../controllers/documents.controller";
import { protetctedRoute } from "../middleware/auth.middleware";
import express from "express";

const router = express.Router();

router.get('/documents', protetctedRoute, getAllUploadedDocuments)
router.delete('/documents', protetctedRoute, deleteDocument)
export default router;
