ALTER TABLE "users" RENAME COLUMN "emial" TO "email";--> statement-breakpoint
ALTER TABLE "users" DROP CONSTRAINT "users_emial_unique";--> statement-breakpoint
ALTER TABLE "users" ADD CONSTRAINT "users_email_unique" UNIQUE("email");