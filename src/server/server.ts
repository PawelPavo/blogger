import * as express from 'express';
import * as morgan from 'morgan';
import * as cors from 'cors';
import * as path from 'path';
import apiRouter from './routes';

const app = express();

app.get('/status', (req, res) => res.status(200).end)
app.head('/status',(req, res) => res.status(200).end)

app.use(cors());
app.use(express.static('public'));
app.use(morgan('dev'));
app.use(express.json());
app.use('/api', apiRouter);
app.use((error: Error, req: express.Request, res: express.Response, next: express.NextFunction)=> {
    res.status(error.status || 500);
    res.json({err: error.messgae})
})
app.get('*', (req,res) => res.sendFile(path.join(__dirname, '../public/index.html')))

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server listening on port: ${port}`));


type Error = {
    status?: number;
    messgae?: string;
}
