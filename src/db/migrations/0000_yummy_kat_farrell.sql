CREATE TABLE "inspection" (
	"id" serial PRIMARY KEY NOT NULL,
	"PartNo" text NOT NULL,
	"PartName" text NOT NULL,
	"Category" text,
	"RelatedTo" text NOT NULL,
	"IDim" text,
	"Parameter" text NOT NULL,
	"Spec" text,
	"LowerLimit" double precision,
	"UpperLimit" double precision,
	"Method" text
);
