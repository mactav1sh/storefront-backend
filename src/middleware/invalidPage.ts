import { Request, Response } from 'express';
export default function (_req: Request, res: Response) {
  return res.status(404).json({
    status: 'error',
    message: "page requested doesn't exist",
  });
}
