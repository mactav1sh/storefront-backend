import productStore from '../models/product';
import { Response, Request, NextFunction } from 'express';

const store = new productStore();

export const index = async (
  _req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const response = await store.index();
    res.json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const showProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const id = parseInt(req.params.id);
  try {
    const response = await store.showProduct(id);
    res.json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const createProduct = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { name, price } = req.body;
    const response = await store.createProduct(name, price);
    res.json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
