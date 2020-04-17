import 'reflect-metadata';

import express from 'express';
import routes from './routes/index';

import './database/index';

const app = express();

app.use(express.json());
app.use(routes);

app.listen(3333, () => {
  console.log('🚀 Server running on 3333...');
});
