import jwt from 'jsonwebtoken';
import IUser from '../interfaces/userModel';
import config from '../../../config';

const generateToken = (user: IUser) => {
  const token = jwt.sign(user, config.APP_SECRET);
  return token;
};

export default generateToken;
