import { Router } from 'express';
import express from 'express';
import { review } from '@review/controller/create.controller';
import { reviewsByGigId, reviewsBySellerId } from '@review/controller/get.controller';

const router: Router = express.Router();

const reviewRoutes = (): Router => {
  router.get('/gig/:gigId', reviewsByGigId);
  router.get('/seller/:sellerId', reviewsBySellerId);
  router.post('/', review);

  return router;
};

export { reviewRoutes };
