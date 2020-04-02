import {RequestHandler} from 'express';

export const authorBody: RequestHandler = (req, res, next) => {
    const authorKeys = Object.keys(req.body);
    if (authorKeys.includes('name') && authorKeys.includes('email')) {
        next()
    } else {
        res.status(400).json({error: 'Bad Request for Author Insert'});
    };
};