import { jsonb, integer, pgTable, text, uuid, timestamp } from 'drizzle-orm/pg-core'
import { relations, type InferSelectModel } from 'drizzle-orm';
import { user } from './user'
import { required_documents } from './required_documents';
import { ticket_attachment } from './ticket_attachment';
import { service_templates } from './service_templates';
import { notification_attachment } from './notification_attachment';
import { job_document } from './job_doc';
import { createInsertSchema } from 'drizzle-zod';
import { z } from 'zod';
export const files = pgTable("document", {
    id: uuid().primaryKey().defaultRandom(),
    uploadedBy: text("uploaded_by").notNull().references(() => user.id),
    name: text().notNull(),
    type: text().notNull(),
    url: text().notNull().unique(),
    metadata: jsonb(),
    version: integer().notNull().default(1),
    status: text(),
    tags: text(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("created_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

export const filesRelations = relations(files, ({ many }) => ({
    ticketAttachment: many(ticket_attachment),
    serviceTemplate: many(service_templates),
    requiredDocument: many(required_documents),
    notificationAttachment: many(notification_attachment),
    jobDocument: many(job_document),
}))

const baseSchema = createInsertSchema(files).omit({ createdAt: true, updatedAt: true })

export const documentSchema = z.union([
    z.object({
        mode: z.literal('create'),
        uploadedBy: baseSchema.shape.uploadedBy,
        name: baseSchema.shape.name,
        type: baseSchema.shape.type,
        url: baseSchema.shape.url,
        metadata: baseSchema.shape.metadata,
        version: baseSchema.shape.version,
        status: baseSchema.shape.status,
        tags: baseSchema.shape.tags,
    }),
    z.object({
        mode: z.literal('update'),
        id: baseSchema.shape.id,
        uploadedBy: baseSchema.shape.uploadedBy,
        name: baseSchema.shape.name,
        type: baseSchema.shape.type,
        url: baseSchema.shape.url,
        metadata: baseSchema.shape.metadata,
        version: baseSchema.shape.version,
        status: baseSchema.shape.status,
        tags: baseSchema.shape.tags,
    })
])
export type documentSchema = z.infer<typeof documentSchema>
export type selectDocumentModel = InferSelectModel<typeof files>
