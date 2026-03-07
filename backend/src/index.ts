import express from 'express';
import type { Express } from 'express';
import cors from 'cors';
import { PORT } from './constants/constants';
import apiRoute from './routes/api.route';
import mysqlDb from './config/mysqlDb';
import dotenv from 'dotenv';

const app: Express = express();

app.use(cors());
app.use(express.json());
dotenv.config();
app.use('/api/', apiRoute);

const run = async () => {
  await mysqlDb.init();
  app.listen(PORT, () => {
    console.log(`http://localhost:${PORT}`);
  });
};

run().catch((error) => console.error(error));
