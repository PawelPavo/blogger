import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as path from 'path';
import logger, {stream} from './utils/logger';
import config from './config';
import apiRouter from './routes';



const app = express();

app.get('/status', (req, res) => res.status(200).end())
app.head('/status',(req, res) => res.status(200).end())

app.use(cors());
app.use(express.static('public'));
app.use(morgan(config.logs.morgan, {stream}));
app.use(express.json());
app.use('/api', apiRouter);
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
    logger.error(error);
    res.status(error.status || 500);
    res.json({err: error.message})
})
app.get('*', (req,res) => res.sendFile(path.join(__dirname, '../public/index.html')))
app.listen(config.port, () => logger.info(`✌️ Server listening on port: ${config.port} ✌️`));


type Error = {
    status?: number;
    message?: string;
}
