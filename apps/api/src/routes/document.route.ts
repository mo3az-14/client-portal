import { getAllUploadedDocuments } from "@/controllers/documents.controller";
import { protetctedRoute } from "@/middleware/auth.middleware";
import express from "express";

const router = express.Router();

router.get('/documents', protetctedRoute, getAllUploadedDocuments)
export default router;
