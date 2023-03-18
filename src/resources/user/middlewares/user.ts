import { Request, Response, NextFunction } from 'express';
import responseMiddleware from '../../../middleware/response';
import UserModel from '../models/user';
import IUser from '../interfaces/userModel';

export default class UserMiddleware {
  async createUser(req: Request, res: Response, next: NextFunction): Promise<any> {
    try {
      const userExist: IUser | undefined = UserModel.findByEmail(req.body.email);
      if (userExist) throw new Error('User already exist');
      return next();
    } catch (error) {
      return responseMiddleware.errorResponse(res, error);
    }
  }
}
