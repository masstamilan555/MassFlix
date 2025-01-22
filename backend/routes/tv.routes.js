import express from 'express';
import { getSimilarTv, getTrendingTv, getTvByCategory, getTvDetails, getTvTrailer } from '../controller/tv.controller.js';

const router = express.Router();

router.get('/trending', getTrendingTv);
router.get("/:id/trailer", getTvTrailer);
router.get("/:id/details", getTvDetails);
router.get("/:id/similar", getSimilarTv);
router.get("/:category", getTvByCategory);

export default router;