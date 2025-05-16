import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { createInsertSchema } from 'drizzle-zod'
import { z } from 'zod'
import { relations } from "drizzle-orm";
import { service } from "./service";
import { files } from "./document";

export const service_templates = pgTable('service_templates', {
    serviceId: uuid().references(() => service.id).notNull(),
    template: uuid().references(() => files.id).notNull(),
}, (table) => [primaryKey({ columns: [table.serviceId, table.template] })])

export const serviceTemplateRelations = relations(service_templates, ({ one }) => ({
    service: one(service, { fields: [service_templates.serviceId], references: [service.id], relationName: "service" }),
    template: one(files, { fields: [service_templates.template], references: [files.id], relationName: "template" }),
}))

const serviceTemplates = createInsertSchema(service_templates)
export type ServiceTemplates = z.infer<typeof serviceTemplates>;
