import express from 'express';
import { getUserOrder } from '../../controllers/orders';

const ordersRouter = express.Router();

//Routes
ordersRouter.get('/:id/orders', getUserOrder);

export default ordersRouter;
