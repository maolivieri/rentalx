import express from "express";
import { categoriesRoutes } from "./routes/categories.routes";
import { specificationsRoutes } from "./routes/specifications.routes";

const app = express();
app.use(express.json());

app.use("/specifications", specificationsRoutes);
app.use("/categories", categoriesRoutes);

app.listen(3333, () => console.log("The server is running!   =)"));
