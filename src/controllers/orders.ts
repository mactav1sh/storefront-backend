import { Request, Response, NextFunction } from 'express';
import OrdersStore from '../models/order';

const store = new OrdersStore();

export const getUserOrder = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    console.log(req.params);
    const response = await store.getUserOrder(id);
    res.json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
