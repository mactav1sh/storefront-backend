import express from 'express';
import { getUserOrder } from '../../controllers/orders';
import validateToken from '../../middleware/validateToken';

const ordersRouter = express.Router();

//Routes
ordersRouter.get('/:id/orders', validateToken, getUserOrder);

export default ordersRouter;
