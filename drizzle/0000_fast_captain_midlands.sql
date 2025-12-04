CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"name" text NOT NULL,
	"emial" text NOT NULL,
	CONSTRAINT "users_emial_unique" UNIQUE("emial")
);
