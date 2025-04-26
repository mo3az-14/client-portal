import { pgTable, uuid, text, integer, timestamp } from 'drizzle-orm/pg-core'
import { relations } from 'drizzle-orm';
import { files } from './document'
import { service_templates } from './service_templates';
import { required_documents } from './required_documents';

export const service = pgTable("service", {
    id: uuid().primaryKey().defaultRandom(),
    name: text().notNull(),
    price: integer().notNull(),
    template: uuid().notNull().references(() => files.id),
    period: integer(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("created_at").notNull().defaultNow().$onUpdate(() => new Date()),
})

export const serviceRelations = relations(service, ({ many }) => ({
    documents: many(required_documents),
    templates: many(service_templates),
}))

