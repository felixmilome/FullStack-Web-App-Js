import express from 'express';
import{postReview, getReviews, patchReview, deleteReview} from '../controllers/reviewsController.js';
import { auth } from '../middleware/authMiddleware.js';


export const reviewsRouter = express.Router(); 

reviewsRouter.post ('/', auth, postReview); 
reviewsRouter.get ('/:postId', auth, getReviews);
reviewsRouter.delete ('/:reviewId', auth, deleteReview);
reviewsRouter.patch ('/', auth, patchReview);
