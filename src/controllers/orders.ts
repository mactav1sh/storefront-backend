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
    const response = await store.getUserOrder(id);
    if (!response) {
      return res.status(404).json({
        status: 'error',
        message: `user with id:${id}, doesn't have any orders`,
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
