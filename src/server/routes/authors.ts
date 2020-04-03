import { Router, json } from 'express';
import {authorBody} from '../middleware/authors'
import db from '../db';
import logger from '../utils/logger';
const router = Router();

//GET api/authors
router.get('/', async(req,res) => {
    try {
        const blogs = await db.authors.all();
        res.json(blogs)
        logger.silly('Getting ALL authors')

    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with GET ALL authors!'})
    }
});

//GET api/authors/:id
router.get('/:id', async (req,res) =>{
    const id = req.params.id;
    try {
        const author = await db.authors.one(id)
        res.json(author)
        logger.silly('Getting ONE author')
    } catch (error) {
        res.status(500).json({error: 'Sorry we found an error with GET ONE author!'})
    }
});

//POST api/authors
router.post('/',authorBody, async (req, res)=>{
    const author = req.body;
    try {
        const {insertId} = await db.authors.insert(author.name, author.email);
        res.status(201).json({insertId, msg: 'Author Inserted'})
        logger.silly('Author added.')
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with your author POST request!'})
    }
});

//PUT api/authors/:id
router.put('/:id', async(req,res)=>{
    const id = Number(req.params.id);
    const autorName = req.body.name
    const authorEmail = req.body.email

    try {
        const result = await db.authors.update(autorName, authorEmail, id)
        res.status(200).json({msg: 'Author information UPDATED', result})
        logger.silly('Author edited.')
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry there was an error with your UPDATE request!'})
    }
});


//DELETE api/authors/:id
router.delete('/:id', async (req, res)=>{
    const id = Number(req.params.id);
    try {
        const result = await db.authors.destory(id)
        res.status(200).json({msg: 'Author Deleted', result})
        logger.silly('Author deleted')
    } catch (error) {
        console.log(error)
        res.status(500).json({error: 'Sorry we found an error with your author DELETE request!'})
    }

})

export default router;