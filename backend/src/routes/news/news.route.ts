import type { Request, Response, Router } from "express";
import express from "express";

const newsRouter: Router = express.Router();

newsRouter.get("/", (_req: Request, res: Response) => {
  return res.json("news");
});

export default newsRouter;
