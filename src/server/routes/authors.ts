import { Router, json } from 'express';
import {authorBody} from '../middleware/authors'
import db from '../db';
import logger from '../utils/logger';
const router = Router();

//GET api/authors
router.get('/', async(req,res, next) => {
    try {
        logger.silly('Getting all authors');
        const blogs = await db.authors.all();
        res.json(blogs)

    } catch (error) {
        logger.warn('Get All Authors Failed');
        next(error);      
    };
});

//GET api/authors/:id
router.get('/:id', async (req,res, next) =>{
    const id = req.params.id;
    try {
        logger.silly('Getting one author')
        const author = await db.authors.one(id)
        res.json(author)
    } catch (error) {
        logger.warn('Get One Authors Failed');
        next(error);    
    };
});

//POST api/authors
router.post('/',authorBody, async (req, res, next)=>{
    const author = req.body;
    try {
        logger.silly('Posting an author')
        const {insertId} = await db.authors.insert(author.name, author.email);
        res.status(201).json({insertId, msg: 'Author Inserted'})
    } catch (error) {
        logger.warn('Posting an Authors Failed');
        next(error);    
    };
});

//PUT api/authors/:id
router.put('/:id', async(req,res, next)=>{
    const id = Number(req.params.id);
    const autorName = req.body.name
    const authorEmail = req.body.email

    try {
        logger.silly('Editing an Author')
        const result = await db.authors.update(autorName, authorEmail, id)
        res.status(200).json({msg: 'Author information UPDATED', result})
    } catch (error) {
        logger.warn('Editing an Authors Failed');
        next(error); 
    };
});


//DELETE api/authors/:id
router.delete('/:id', async (req, res, next)=>{
    const id = Number(req.params.id);
    try {
        logger.silly('Deleting an Author')
        const result = await db.authors.destory(id)
        res.status(200).json({msg: 'Author Deleted', result})
    } catch (error) {
        logger.warn('Deletinh an Authors Failed');
        next(error); 
    };
})

export default router;