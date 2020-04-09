import * as dotenv from 'dotenv';

const envFound = dotenv.config();
if(!envFound){
    throw new Error ("⚠️  Couldn't find .env file  ⚠️");
};

export default {
    port: parseInt(process.env.PORT, 10),
    mysql: {
        host: process.env.DB_HOST,
        user: process.env.DB_USER,
        password: process.env.DB_PASS,
        database: process.env.DB_SCHEMA
    },
    logs: {
        level: process.env.LOG_LEVEL,
        morgan: process.env.MORGAB
    }
};