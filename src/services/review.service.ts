import { IReviewDocument, IReviewMessageDetails } from '@vsatya-kirankumar/jobber-shared';
import { pool } from 'src/database';
import { publishFanoutMessage } from '@review/queues/review.producer';
import { reviewChannel } from '@review/server';
import { QueryResult } from 'pg';

const addReview = async (data: IReviewDocument): Promise<IReviewDocument> => {
  const { gigId, reviewerId, reviewerImage, review, sellerId, rating, orderId, reviewType, reviewerUsername, country } = data;

  const createdAtDate = new Date();
  const queryText = `
      INSERT INTO reviews(gigId, reviewerId, reviewerImage, review, sellerId, rating, orderId, reviewType, reviewerUsername, country, createdAtDate) values($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11)
      RETURNING *
    `;
  const values = [
    gigId,
    reviewerId,
    reviewerImage,
    review,
    sellerId,
    rating,
    orderId,
    reviewType,
    reviewerUsername,
    country,
    createdAtDate
  ];

  const { rows } = await pool.query(queryText, values);
  console.log(rows[0]);

  const messageDetails: IReviewMessageDetails = {
    gigId: data.gigId,
    reviewerId: data.reviewerId,
    sellerId: data.sellerId,
    review: data.review,
    rating: data.rating,
    orderId: data.orderId,
    createdAt: `${createdAtDate}`,
    type: `${reviewType}`
  };

  await publishFanoutMessage(
    reviewChannel,
    'jobber-review',
    JSON.stringify(messageDetails),
    'Review details sent to order and users services'
  );

  return rows[0];
};

const getReviewsByGigId = async (gigId: string): Promise<IReviewDocument[]> => {
  const reviews: QueryResult = await pool.query('SELECT * FROM review where reviews.gigId= $1', [gigId]);

  return reviews.rows;
};

const getReviewsBySellerId = async (sellerId: string): Promise<IReviewDocument[]> => {
  const reviews: QueryResult = await pool.query('SELECT * FROM review where reviews.sellerId= $1 AND reviews.reviewType = $2', [
    sellerId,
    'seller-review'
  ]);

  return reviews.rows;
};

export { addReview, getReviewsByGigId, getReviewsBySellerId };
