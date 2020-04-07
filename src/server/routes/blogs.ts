import { Router, json } from 'express';
import logger from '../utils/logger';
import db from '../db';
import { blogBody } from '../middleware/blogs';

const router = Router();

//GET api/blogs
router.get('/', async(req,res, next) => {
    try {
        logger.silly('Getting All Blogs');
        const blogs = await db.blogs.all();
        res.json(blogs);
    } catch (error) {
        logger.warn('Get All Blogs Failed');
        next(error);
    };
});

//GET api/blogs/:id
router.get('/:id', async (req,res, next) =>{
    const id = req.params.id;
    try {
        logger.silly('Getting One Blog');
        const [blog] = await db.blogs.one(id);
        res.json(blog);
    } catch (error) {
        logger.warn('Getting one blog failed');
        next(error);
    };
});

//POST api/blogs
router.post('/', blogBody, async(req, res, next) => {
    const blog = req.body;
    try {
        logger.silly('Posting a Blog');
        const {insertId} = await db.blogs.insert(blog.title, blog.content, blog.authorid);
        res.status(201).json({insertId, msg: 'Blog Inserted'});
    } catch (error) {
        logger.warn('Posting a blog failed');
        next(error);
    };
});

//PUT api/blogs/:id
router.put('/:id', async(req,res, next) =>{
    const id = Number(req.params.id);
    const blogTitle = req.body.title;
    const blogContent = req.body.content;

    try {
        logger.silly('Editing a Blog');
        const result = await db.blogs.update(blogTitle, blogContent, id)
        res.status(200).json({msg: 'Blog has been updated', result})
    } catch (error) {
        logger.warn('Editing a blog failed');
        next(error);    
    };
});

// DELETE api/blogs/:id
router.delete('/:id', async(req, res, next) =>{
    const id = Number(req.params.id);
    try {
        logger.silly('Deleting a Blog');
        const result = await db.blogs.destroy(id)
        res.status(200).json({msg: 'Blog Deleted', result})
    } catch (error) {
        logger.warn('Deleting a blog failed');
        next(error);     
    };
});


export default router;