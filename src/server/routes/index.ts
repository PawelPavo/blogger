import {Router} from 'express';
import blogsRouter from './blogs';
import authorRouter from './authors';
import tagsRouter from './tags';
import blogTagsRouter from './blogTags';


const router = Router()

router.use('/blogs', blogsRouter)
router.use('/authors', authorRouter)
router.use('/tags', tagsRouter)
router.use('/blogTags', blogTagsRouter)

export default router;