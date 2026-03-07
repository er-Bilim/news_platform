import type { Request, Response, Router } from 'express';
import express from 'express';
import { imagesUpload } from '../../middlewares/multer';
import { INews, INewsWithoutContent } from '../../types/news/news.types';
import type { Connection, ResultSetHeader } from 'mysql2/promise';
import mysqlDb from '../../config/mysqlDb';
import validateDb from '../../utils/validateDB';
import { Repository } from '../../repositories/repository';

const newsRouter: Router = express.Router();

newsRouter.get('/', async (_req: Request, res: Response) => {
  try {
    const repository = new Repository<INewsWithoutContent>('news', ['id', 'title', 'image', 'publication_date']);
    const news = await repository.getAll();
    return res.json(news);
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

newsRouter.post(
  '/',
  imagesUpload.single('image'),
  async (req: Request, res: Response, next) => {
    const news: INews = req.body;

    const correctNewsData: INews = {
      ...news,
      title: news.title,
      content: news.content || null,
      image: req.file ? `images/${req.file.filename}` : null,
    };

    try {
      const isValidate = validateDb.validateCreateData(correctNewsData, [
        'title',
        'content',
      ]);
      if (!isValidate)
        return res.status(400).json({ error: 'Title or content is empty' });

      const connection: Connection = await mysqlDb.getConnection();
      const [result] = await connection.query(
        `INSERT INTO news (title, content, image) VALUES (?, ?, ?)`,
        [correctNewsData.title, correctNewsData.content, correctNewsData.image],
      );

      const resultHeader: ResultSetHeader = result as ResultSetHeader;

      const [insertedNews] = await connection.query(
        `SELECT * FROM news WHERE id = ?`,
        [resultHeader.insertId],
      );

      const createdNews = insertedNews as INews[];

      res.status(201).json(...createdNews);
    } catch (error) {
      next(error);
      return res.status(500).json({ error: 'Internal server error' });
    }
  },
);

export default newsRouter;
