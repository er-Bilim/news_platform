import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import { PORT } from './constants/constants.js';
import apiRoute from './routes/api.route.js';
import mysqlDb from './config/mysqlDb.js';
import dotenv from 'dotenv';

const app: Express = express();

app.use(cors());
app.use(express.json());
dotenv.config();
app.use('/api/', apiRoute);

app.use((_req, res) => {
  return res.status(404).json({ error: 'Not found' });
});

const run = async () => {
  await mysqlDb.init();
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

run().catch((error) => console.error(error));
