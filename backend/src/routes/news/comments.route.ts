import type { Request, Response, Router } from 'express';
import express from 'express';
import type { IComment } from '../../types/news/news.types.js';
import validateDb from '../../utils/validateDB.js';
import type { Connection, ResultSetHeader } from 'mysql2/promise';
import mysqlDb from '../../config/mysqlDb.js';
import { Repository } from '../../repositories/repository.js';

const commentsRouter: Router = express.Router();

commentsRouter.get('/', async (req: Request, res: Response) => {
  try {
    const news_id = req.query.news_id as string;

    const repository = new Repository<IComment>('comments', '*');
    const comments = await repository.getAll();

    if (news_id) {
      const filteredComments = await repository.getByField('news_id', news_id);

      if (filteredComments.length === 0) {
        return res.status(404).json({ error: 'Comments not found' });
      }

      return res.json(filteredComments);
    } else {
      return res.json(comments);
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'Internal server error' });
  }
});

commentsRouter.post('/', async (req: Request, res: Response) => {
  const comment: IComment = req.body;

  const correctCommentData: IComment = {
    ...comment,
    news_id: String(comment.news_id),
    author: comment.author || 'Anonymous',
    content: comment.content,
  };

  try {
    const isValidate = validateDb.validateCreateData(correctCommentData, [
      'news_id',
      'content',
    ]);

    if (!isValidate)
      return res.status(400).json({ error: 'News id or content is empty' });

    const connection: Connection = await mysqlDb.getConnection();
    const [result] = await connection.query(
      `INSERT INTO comments (news_id, author, content) VALUES (?, ?, ?)`,
      [
        correctCommentData.news_id,
        correctCommentData.author,
        correctCommentData.content,
      ],
    );

    const resultHeader: ResultSetHeader = result as ResultSetHeader;

    const [insertedComment] = await connection.query(
      `SELECT * FROM comments WHERE ID = ?`,
      [resultHeader.insertId],
    );

    const createdComment = insertedComment as IComment[];

    return res.json(...createdComment);
  } catch (error) {
    const err = validateDb.validateDataId(error, ['news_id'], res);
    if (!err) return err;
    return res.status(500).json({ error: 'Internal server error' });
  }
});

commentsRouter.delete('/:id', async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const repository = new Repository<boolean>('comments', null);
    const isDeleted: boolean = await repository.deleteItem(id as string);

    if (isDeleted) {
      return res.json({
        message: 'Comment deleted successfully',
      });
    } else {
      return res.status(404).json({
        error: 'Comment not found',
      });
    }
  } catch {
    res.status(500).json({ error: 'Internal server error' });
  }
});

export default commentsRouter;
