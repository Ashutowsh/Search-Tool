CREATE TABLE "users" (
	"id" uuid PRIMARY KEY DEFAULT gen_random_uuid() NOT NULL,
	"title" varchar(255) NOT NULL,
	"content" varchar(500) NOT NULL,
	CONSTRAINT "users_title_unique" UNIQUE("title")
);
