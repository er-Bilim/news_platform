import type { Request, Response, Router } from "express";
import express from "express";

const commentsRouter: Router = express.Router();

commentsRouter.get("/", (_req: Request, res: Response) => {
  return res.json("comments");
});

export default commentsRouter;
