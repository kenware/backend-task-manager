import bcrypt from 'bcrypt';
import { Request, Response } from 'express';
import IUserController from '../interfaces/userController';
import ResponseMiddleware from '../../../middleware/response';
import UserModel from '../models/user';
import IUser from '../interfaces/userModel';
import generateToken from '../utils/user';

export default class UserController implements IUserController {
  async createUser(req: Request, res: Response) {
    try {
      const user: IUser = UserModel.create({
        ...req.body,
        password: bcrypt.hashSync(req.body.password, 10),
      });
      const messsage = 'User created successfully';
      return ResponseMiddleware.successResponse(res, user, messsage, 201);
    } catch (err) {
      return ResponseMiddleware.errorResponse(res, err);
    }
  }

  async loginUser(req: Request, res: Response) {
    try {
      const { email, password } = req.body;
      const user: IUser | undefined = UserModel.findByEmail(email);
      if (!user) throw new Error('Credentials not found. Please create an account');
      const isPassword = bcrypt.compareSync(password, user.password);
      if (!isPassword) throw new Error('Invalid email or password');
      const message = 'User login successful';
      const token = generateToken(user);
      const data = { token, user };
      return ResponseMiddleware.successResponse(res, data, message);
    } catch (err) {
      return ResponseMiddleware.errorResponse(res, err);
    }
  }
}
