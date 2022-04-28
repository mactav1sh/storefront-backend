import express from 'express';
import { index, showProduct, createProduct } from '../../controllers/products';

const productsRouter = express.Router();

//Routes
productsRouter.get('/', index);
productsRouter.get('/:id', showProduct);
productsRouter.post('/', createProduct);

export default productsRouter;
