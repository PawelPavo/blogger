import { Router, json } from 'express';
import logger from '../utils/logger';
import db from '../db';
import {blogTagBody} from '../middleware/blogTags'

const router = Router();

//GET api/blogTags
router.get('/', async(req,res, next) => {
    try {
        logger.silly('Getting All Tags');
        const blogTags = await db.blogTags.all();
        res.json(blogTags);
    } catch (error) {
        logger.warn('Get All Tags Failed');
        next(error);
    };
});


//POST api/blogs
router.post('/', blogTagBody, async(req, res, next) => {
    const blogTags = req.body;
    try {
        logger.silly('Posting a Blog');
        const {insertId} = await db.blogTags.insert(blogTags.blogid, blogTags.tagid);
        res.status(201).json({insertId, msg: 'Blog Inserted'});
    } catch (error) {
        logger.warn('Posting a blog failed');
        next(error);
    };
});

export default router;