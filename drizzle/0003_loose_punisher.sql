CREATE TABLE "teste" (
	"id" uuid NOT NULL,
	"title" uuid NOT NULL,
	"createdAt" timestamp DEFAULT now() NOT NULL
);
--> statement-breakpoint
ALTER TABLE "teste" ADD CONSTRAINT "teste_id_users_id_fk" FOREIGN KEY ("id") REFERENCES "public"."users"("id") ON DELETE no action ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "teste" ADD CONSTRAINT "teste_title_courses_id_fk" FOREIGN KEY ("title") REFERENCES "public"."courses"("id") ON DELETE no action ON UPDATE no action;