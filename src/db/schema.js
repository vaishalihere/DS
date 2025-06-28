import {
  pgTable,
  serial,
  text,
  doublePrecision
} from "drizzle-orm/pg-core";

export const favouritesTable = pgTable("favourites", {
  id: serial("id").primaryKey(),
  userId: text("userId").notNull(),
  PartNo: text("PartNo").notNull(),
  PartName: text("PartName").notNull(),
  Category: text("Category"),
  RelatedTo: text("RelatedTo").notNull(),
  IDim: text("IDim"),
  Parameter: text("Parameter").notNull(),
  Spec: text("Spec"),
  LowerLimit: doublePrecision("LowerLimit"),
  UpperLimit: doublePrecision("UpperLimit"),
  Method: text("Method")
});
