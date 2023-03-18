import jwt from 'jsonwebtoken';
import { Request, Response, NextFunction } from 'express';
import config from '../config';
import UserModel from '../resources/user/models/user';

interface JwtPayload {
  id: string
}

const auth = async (req: Request, res: Response, next: NextFunction) => {
  const authorization = req.header('Authorization');
  if (authorization) {
    try {
      const token = authorization.replace('Bearer ', '').trim();
      const data = jwt.verify(token, config.APP_SECRET) as JwtPayload;
      const userId = data.id;
      const user = await UserModel.findById(userId);
      if (user) {
        res.locals.user = user;
        return next();
      }
      return res.status(403).send({
        status: false,
        message: 'Invalid user token',
        data: null,
      });
    } catch (e) {
      return res.status(401).send({
        status: false,
        message: 'Invalid token',
      });
    }
  } else {
    return res.status(401).send({
      status: false,
      message: 'No authorization token.',
    });
  }
};

export default auth;
