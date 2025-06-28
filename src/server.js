import express from "express";
import { ENV } from "./config/env.js";
import { db } from "./config/db.js";
import { favouritesTable } from "./db/schema.js";
import { and, eq } from "drizzle-orm";
import job from "./config/cron.js";

const app = express();
const PORT = ENV.PORT || 5001;

if (ENV.NODE_ENV === "production") job.start();

app.use(express.json());

app.get("/api/health", (req, res) => {
  res.status(200).json({ success: true });
});

app.post("/api/favourites", async (req, res) => {
  try {
    const { userId, PartNo, PartName, Category, RelatedTo, IDim, Parameter, Spec, LowerLimit, UpperLimit, Method } = req.body;

    if (!userId || !PartNo || !PartName) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const newFavourite = await db
      .insert(favouritesTable)
      .values({
        userId, PartNo, PartName, Category, RelatedTo, IDim, Parameter, Spec, LowerLimit, UpperLimit, Method 
      })
      .returning();
    res.status(201).json(newFavourite[0]);
  } catch (error) {
    console.log("Error adding favourite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.get("/api/favourites/:userId/:PartNo/:Parameter", async (req, res) => {
  try {
    const { userId, PartNo, Parameter  } = req.params;

    const userFavorites = await db
      .select()
      .from(favouritesTable)
      .where(eq(favouritesTable.userId, userId), eq(favouritesTable.PartNo, PartNo), eq(favouritesTable.Parameter, Parameter));

    res.status(200).json(userFavorites);
  } catch (error) {
    console.log("Error fetching the favourites", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.delete("/api/favourites/:userId/:PartNo/:Parameter", async (req, res) => {
  try {
    const { userId, PartNo, Parameter  } = req.params;

    await db
      .delete(favouritesTable)
      .where(
        and(eq(favouritesTable.userId, userId), eq(favouritesTable.PartNo, PartNo), eq(favouritesTable.Parameter, Parameter))
      );

    res.status(200).json({ message: "Favourite removed successfully" });
  } catch (error) {
    console.log("Error removing a favorite", error);
    res.status(500).json({ error: "Something went wrong" });
  }
});

app.listen(PORT, () => {
  console.log("Server is running on PORT:", PORT);
});
