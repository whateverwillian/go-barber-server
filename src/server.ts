import 'reflect-metadata';

import express, { Request, Response, NextFunction } from 'express';
import 'express-async-errors';
import cors from 'cors';

import routes from './routes/index';
import AppError from './errors/AppError';

import './database/index';

const app = express();

app.use(cors());
app.use(express.json());
app.use(routes);

app.use(
  (err: Error, request: Request, response: Response, next: NextFunction) => {
    if (err instanceof AppError) {
      return response.status(err.statusCode).json({
        status: 'Error',
        message: err.message,
      });
    }

    console.error(err);

    return response.status(500).json({
      status: 'Error',
      message: 'Internal server error',
    });
  },
);

app.listen(3333, () => {
  console.log('🚀 Server running on 3333...');
});
