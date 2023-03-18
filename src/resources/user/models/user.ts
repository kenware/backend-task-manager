import { uid } from 'uid';
import IUser from '../interfaces/userModel';

const users: Array<IUser> = [];

export default class UserModel {
  static create(user: IUser): IUser {
    const data = {
      ...user,
      id: uid(32),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    users.push(data);
    return data;
  }

  static findAll() {
    return users;
  }

  static findById(id: string): IUser | undefined {
    const userInstance = users.find((user: IUser) => user.id === id);
    return userInstance;
  }

  static findByEmail(email: string): IUser | undefined {
    const userInstance: IUser | undefined = users.find((user: IUser) => user.email === email);
    return userInstance;
  }
}
