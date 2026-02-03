import { NextFunction, Request, Response } from 'express';
import { Logger } from '@nestjs/common';

export function logger(req: Request, res: Response, next: NextFunction) {
  const logger = new Logger('logger');

  logger.log(`Request... ${req.method} ${req.url}`);
  next();
}
