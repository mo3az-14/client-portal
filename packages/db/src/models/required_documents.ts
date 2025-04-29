import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from "drizzle-orm";
import { files } from "./document";
import { service } from "./service";

export const required_documents = pgTable("required_documents", {
    serviceId: uuid('service_id').references(() => service.id).notNull(),
    attachmentId: uuid('attachment_id').references(() => files.id).notNull(),
}, (table) => [primaryKey({ columns: [table.attachmentId, table.serviceId] })])

export const requiredDocumentsRelations = relations(required_documents, ({ one, }) => ({
    service: one(service, { fields: [required_documents.serviceId], references: [service.id] }),
    attachments: one(files, { fields: [required_documents.attachmentId], references: [files.id] }),
}))


const requiredDocuments = createInsertSchema(required_documents)
export type RequiredDocuments = z.infer<typeof requiredDocuments>;
