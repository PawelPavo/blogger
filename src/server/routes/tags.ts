import { Router, json } from 'express';
import logger from '../utils/logger';
import db from '../db';

const router = Router();

//GET api/tags
router.get('/', async(req,res, next) => {
    try {
        logger.silly('Getting All Tags');
        const tags = await db.tags.all();
        res.json(tags);
    } catch (error) {
        logger.warn('Get All Tags Failed');
        next(error);
    };
});

export default router;