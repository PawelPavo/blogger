import * as mysql from 'mysql';
import config from '../config';
import logger from '../utils/logger';

const pool = mysql.createPool(config.mysql);

export const Query = <T = any> (query: string, values?: Array<any>) =>{

    const sql = mysql.format(query, values);
    logger.silly('Executing Query');
    logger.debug(sql);

    return new Promise <T> ((resolve, reject) => {
        pool.query(sql, (err, results) => {
            if (err) {
                logger.silly('Query Failed!');
                reject(err)
            } else {
                logger.silly('Query Succeeded!');
                resolve(results)
            }
        });
    });
};

import blogs from '././queries/blogs';
import authors from './queries/authors';

export default {
    blogs,
    authors
}