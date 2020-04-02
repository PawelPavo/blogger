import { Router, json } from 'express';
// import { chirpBody } from '../middleware/chirps'
import db from '../db';
import { blogBody } from '../middleware/blogs';

const router = Router();

//GET api/blogs
router.get('/', async(req,res) => {
    try {
        const blogs = await db.blogs.all();
        res.json(blogs);
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Sorry we found an error with GET ALL blogs!'});
    };
});

//GET api/blogs/:id
router.get('/:id', async (req,res) =>{
    const id = req.params.id;
    try {
        const [blog] = await db.blogs.one(id);
        res.json(blog);
    } catch (error) {
        res.status(500).json({error: 'Sorry we found an error with GET ONE blog!'});
    };
});

//POST api/blogs
router.post('/', blogBody, async(req, res) => {
    const blog = req.body;

    try {
        const {insertId} = await db.blogs.insert(blog.title, blog.content, blog.authorid);
        res.status(201).json({insertId, msg: 'Blog Inserted'});
    } catch (error) {
        console.log(error);
        res.status(500).json({error:'Sorry we found an error with your blog POST request!'});
    };
});

//PUT api/blogs/:id
router.put('/:id', async(req,res) =>{
    const id = Number(req.params.id);
    const blogTitle = req.body.title;
    const blogContent = req.body.content;

    try {
        const result = await db.blogs.update(blogTitle, blogContent, id)
        res.status(200).json({msg: 'Blog has been updated', result})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Sorry there was an error with your blog UPDATE request!'});
    };
});

// DELETE api/blogs/:id

router.delete('/:id', async(req, res) =>{
    const id = Number(req.params.id);
    try {
        const result = await db.blogs.destroy(id)
        res.status(200).json({msg: 'Blog Deleted', result})
    } catch (error) {
        console.log(error);
        res.status(500).json({error: 'Sorry we found an error wuth your blog DELETE request!'});
    };
});


export default router;