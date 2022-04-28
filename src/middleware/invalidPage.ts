import { Request, Response } from 'express';
export default function (_req: Request, res: Response) {
  res.status(404).json({
    status: 'failed',
    message: "page requested doesn't exist",
  });
}
