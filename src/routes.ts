import { Application } from 'express';
import { verifyGatewayRequest } from '@vsatya-kirankumar/jobber-shared';
import { reviewRoutes } from '@review/routes/review.route';
import { healthRoutes } from '@review/routes/health.route';

const BASE_PATH = '/api/v1/review';

export const appRoutes = (app: Application) => {
  app.use('', healthRoutes());
  app.use(BASE_PATH, verifyGatewayRequest, reviewRoutes());
};
