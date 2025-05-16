ALTER TABLE "ticket" DROP CONSTRAINT "ticket_reviewed_by_user_id_fk";
--> statement-breakpoint
ALTER TABLE "job_notification" DROP CONSTRAINT "job_notification_attachment_id_notification_id_pk";--> statement-breakpoint
ALTER TABLE "notification" ALTER COLUMN "sender_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "job_accountants" ALTER COLUMN "job_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "job_accountants" ALTER COLUMN "accountant_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "job_document" ALTER COLUMN "job_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "job_notification" ALTER COLUMN "notification_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "job_notification" ALTER COLUMN "attachment_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "required_documents" ALTER COLUMN "service_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "required_documents" ALTER COLUMN "attachment_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "service_templates" ALTER COLUMN "serviceId" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "service_templates" ALTER COLUMN "template" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ticket_attachment" ALTER COLUMN "ticket_id" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "ticket_attachment" ALTER COLUMN "attachment" SET NOT NULL;--> statement-breakpoint
ALTER TABLE "job_notification" ADD CONSTRAINT "job_notification_notification_id_attachment_id_pk" PRIMARY KEY("notification_id","attachment_id");--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_number" text;--> statement-breakpoint
ALTER TABLE "user" ADD COLUMN "phone_number_verified" boolean;--> statement-breakpoint
ALTER TABLE "ticket" DROP COLUMN "reviewed_by";