import { Request, Response, NextFunction } from 'express';

export default function (
  err: Error,
  _req: Request,
  res: Response,
  next: NextFunction
) {
  res.status(500).json({
    status: 'failed',
    message: err.message,
  });
  next();
}
