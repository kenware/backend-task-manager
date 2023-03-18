import { Request, Response, NextFunction } from 'express';

interface IStaffController {
  createUser(req: Request, res: Response, next: NextFunction): void;
  loginUser(req: Request, res: Response, next: NextFunction): void;
}

export default IStaffController;
