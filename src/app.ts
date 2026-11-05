
import express,{type Request, type Response} from 'express';
import autRouter from '../src/routes/auth.routes.js'


import { errorHandler } from './middlewares/error-handler.js';
const app = express();

app.use(express.json());

app.get('/api', (req : Request, res: Response) : void => {
    res.status(200).json({
        message: 'hello api'
    });
});



app.use('/api/auth',autRouter)



app.use(errorHandler)


export default app;
