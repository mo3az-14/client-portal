import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { files } from "./document";
import { service } from "./service";

export const required_documents = pgTable("required_documents", {
    serviceId: uuid('service_id').references(() => service.id).notNull(),
    attachmentId: uuid('attachment_id').references(() => files.id).notNull(),
}, (table) => [primaryKey({ columns: [table.attachmentId, table.serviceId] })])
