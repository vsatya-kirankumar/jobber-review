import { config } from '@review/config';
import { winstonLogger } from '@vsatya-kirankumar/jobber-shared';
import { Pool } from 'pg';
import { Logger } from 'winston';

const log: Logger = winstonLogger(`${config.ELASTIC_SEARCH_URL}`, 'reviewDatabaseServer', 'debug');

const pool: Pool = new Pool({
  host: `${config.DATABASE_HOST}`,
  user: `${config.DATABASE_USER}`,
  password: `${config.DATABASE_PASSWORD}`,
  port: 5432,
  database: `${config.DATBASE_NAME}`
});

pool.on('error', (error: Error) => {
  console.log('error', 'pg client error', error);
  process.exit(-1);
});

const createTableQuery = `
  CREATE TABLE IF NOT EXISTS public.reviews (
    id SERIAL UNIQUE,
    gigId text NOT NULL,
    reviewerId text NOT NULL,
    orderId text NOT NULL,
    sellerId text NOT NULL,
    review text NOT NULL,
    reviewerImage text NOT NULL,
    reviewerUsername text NOT NULL,
    country text NOT NULL,
    reviewType text NOT NULL,
    rating integer DEFAULT 0 NOT NULL,
    createdAt timestamp DEFAULT CURRENT_DATE,
    PRIMARY KEY (id)
  );

  CREATE INDEX IF NOT EXISTS gigId_idx ON public.reviews (gigId);
  CREATE INDEX IF NOT EXISTS sellerId_idx ON public.reviews (sellerId);
`;

const databaseConnection = async (): Promise<void> => {
  try {
    await pool.connect();
    log.info('Review Service successfully connected to database.');
    await pool.query(createTableQuery);
  } catch (error) {
    log.error('Review Service - Unable to connect to database.');
    log.log('error', 'Review Service databaseConnection() method error.', error);
  }
};

export { databaseConnection, pool };
