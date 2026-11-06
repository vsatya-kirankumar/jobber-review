import { health } from '@review/controller/health.controller';
import express, { Router } from 'express';

const router: Router = express.Router();

const healthRoutes = (): Router => {
  router.get('/review-health', health);

  return router;
};

export { healthRoutes };
