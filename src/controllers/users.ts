import { Response, Request, NextFunction } from 'express';
import UserStore from '../models/user';
import jwt from 'jsonwebtoken';

const store = new UserStore();

export const index = async (
  req: Request,
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

export const showUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const id = parseInt(req.params.id);
    const response = await store.showUser(id);

    if (!response) {
      return res.status(404).json({
        statues: 'error',
        message: `user with id:${id} doesn't exist`,
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

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { first_name, last_name, password } = req.body;

    // JWT CREATION AND VERIFICATION
    const token = jwt.sign({ ...req.body }, process.env.SECRET as string);

    const response = await store.createUser(first_name, last_name, password);

    if (!response) {
      return res.status(400).json({
        statues: 'error',
        message: `something went wrong with user:${first_name} creation, please try again`,
      });
    }
    res.json({
      status: 'success',
      data: response,
      token,
    });
  } catch (err) {
    next(err);
  }
};
