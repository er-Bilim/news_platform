import express from "express";
import type { Express } from "express";
import cors from "cors";
import { PORT } from "./constants/constants";
import apiRoute from "./routes/api.route";

const app: Express = express();

app.use(cors());
app.use(express.json());
app.use("/api/", apiRoute);

const run = async () => {
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

run().catch((error) => console.error(error));
