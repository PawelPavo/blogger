import {Router} from 'express';
import blogsRouter from './blogs';
import authorRouter from './authors';


const router = Router()

router.use('/blogs', blogsRouter)
router.use('/authors', authorRouter)

export default router;