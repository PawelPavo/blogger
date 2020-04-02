import {RequestHandler} from 'express';

export const blogBody: RequestHandler = (req, res, next) => {
    const blogKeys = Object.keys(req.body);
    if (blogKeys.includes('title') && blogKeys.includes('content') && blogKeys.includes('authorid') ) {
        next()
    } else {
        res.status(400).json({error: 'Bad Request for Blog Insert'});
    };
};