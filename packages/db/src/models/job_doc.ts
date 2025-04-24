import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { job } from "./job";
import { files } from "./document";

export const job_document = pgTable('job_document', {
    jobId: uuid("job_id").references(() => job.id).notNull(),
    documentId: uuid("document_id").notNull().references(() => files.id).notNull(),
},
    (table) => [primaryKey({ columns: [table.jobId, table.documentId] }),]
)
