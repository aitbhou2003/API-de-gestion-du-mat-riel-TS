
import express,{type Request, type Response} from 'express';

const app = express();

app.use(express.json());

app.get('/api', (req : Request, res: Response) : void => {
    res.status(200).json({
        message: 'hello api'
    });
});

export default app;
