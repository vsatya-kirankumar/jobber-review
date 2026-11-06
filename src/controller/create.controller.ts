import { IReviewDocument } from '@vsatya-kirankumar/jobber-shared';
import { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { addReview } from 'src/services/review.service';

export const review = async (req: Request, res: Response): Promise<void> => {
  const review: IReviewDocument = await addReview(req.body);
  res.status(StatusCodes.CREATED).json({ message: 'Review Created successfully.', review });
};
