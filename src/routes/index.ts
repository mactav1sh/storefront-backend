import express from 'express';
import usersRouter from './individual/users';
import productsRouter from './individual/products';
import ordersRouter from './individual/orders';

const router = express.Router();

router.use('/users', usersRouter);
router.use('/users', ordersRouter);
router.use('/products', productsRouter);

export default router;
