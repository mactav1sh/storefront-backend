import { Request, Response, NextFunction } from 'express';

export default function (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  return res.status(500).json({
    status: 'error',
    message: err.message,
  });
  //next doesn't do anything here but exists because it causes linting issues if left in parameters and not used, if removed from parameters res won't be defined
  next();
}
