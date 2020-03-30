import { Router, json } from 'express';
// import { chirpBody } from '../middleware/chirps'
import db from '../db';

const router = Router();

//GET api/blogs
router.get('/', async(req,res) => {
    try {
        const blogs = await db.blogs.all();
        res.json(blogs)
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with GET ALL blogs!'})
    }
})

export default router;