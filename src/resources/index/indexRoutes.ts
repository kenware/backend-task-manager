import express from 'express';
import IndexController from './indexController';

const router = express.Router();
const IndexRoutes = new IndexController();

router.get(['/', '/api', '/api/'], IndexRoutes.getIndexReponse);

export default router;
