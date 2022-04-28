import { Response, Request, NextFunction } from 'express';
import UserStore from '../models/user';

const store = new UserStore();

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

export const showUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const response = await store.showUser(id);
    res.json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name, password } = req.body;

    const response = await store.createUser(first_name, last_name, password);

    res.json({
      status: 'success',
      data: response,
    });
  } catch (err) {
    next(err);
  }
};
