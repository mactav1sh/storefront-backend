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
    if (!response) {
      return res.status(400).json({
        statues: 'error',
        message: 'something went wrong, please try again',
      });
    }
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

    if (!response) {
      return res.status(404).json({
        statues: 'error',
        message: `product with id:${id} doesn't exist`,
      });
    }
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

    if (!response) {
      return res.status(400).json({
        statues: 'error',
        message: `something went wrong with adding product:${name}, please try again`,
      });
    }
    res.json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
