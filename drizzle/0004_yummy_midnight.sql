ALTER TABLE "teste" RENAME TO "enrollments";--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "teste_id_users_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" DROP CONSTRAINT "teste_title_courses_id_fk";
--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "enrollments" ADD CONSTRAINT "enrollments_title_courses_id_fk" FOREIGN KEY ("title") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;