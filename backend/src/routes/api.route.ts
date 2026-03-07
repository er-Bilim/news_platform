import express from "express";
import type { Router } from "express";
import newsRouter from "./news/news.route";
import commentsRouter from "./news/comments.route";

const apiRoute: Router = express.Router();

apiRoute.use("/news", newsRouter);
apiRoute.use("/comments", commentsRouter);

export default apiRoute;
