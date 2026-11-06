
import express,{type Request, type Response} from 'express';
import autRouter from '../src/routes/auth.routes.js'
import equipmentsRouter from '../src/routes/equipment.routes.js'
import loansRounter from '../src/routes/loan.routes.js'


import { errorHandler } from './middlewares/error-handler.js';
const app = express();

app.use(express.json());

app.get('/api', (req : Request, res: Response) : void => {
    res.status(200).json({
        message: 'hello api'
    });
});



app.use('/api/auth',autRouter)
app.use('/api/equipments',equipmentsRouter)
app.use('/api/loans',loansRounter)



app.use(errorHandler)


export default app;
