import express from 'express';
import { index, showProduct, createProduct } from '../../controllers/products';
import validateToken from '../../middleware/validateToken';

const productsRouter = express.Router();

//Routes
productsRouter.get('/', index);
productsRouter.get('/:id', showProduct);
productsRouter.post('/', validateToken, createProduct);

export default productsRouter;
