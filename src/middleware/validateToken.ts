import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';

const validateToken = (req: Request, res: Response, next: NextFunction) => {
  try {
    const authorization = req.headers.authorization as string;
    const token = authorization.split(' ')[1];
    jwt.verify(token, process.env.SECRET as string);
    next();
  } catch (error) {
    res.status(401).json({
      status: 'error',
      message: 'user authorization failed, please try again',
    });
  }
};
export default validateToken;
