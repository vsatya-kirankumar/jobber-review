import { start } from '@review/server';
import express, { Express } from 'express';
import { databaseConnection } from '@review/database';

const initialize = (): void => {
  const app: Express = express();
  databaseConnection();
  start(app);
};

initialize();
