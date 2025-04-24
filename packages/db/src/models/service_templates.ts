import { pgTable, primaryKey, uuid } from "drizzle-orm/pg-core";
import { service } from "./service";
import { files } from "./document";

export const service_templates = pgTable('service_templates', {
    serviceId: uuid().references(() => service.id).notNull(),
    template: uuid().references(() => files.id).notNull(),
}, (table) => [primaryKey({ columns: [table.serviceId, table.template] })])
