import IUser from '../../resources/user/interfaces/userModel';

const user: IUser = {
  email: `${Math.floor(Math.random() * 101)}-email${Math.floor(Math.random() * 101)}@gmail.com`,
  password: 'testpassword',
  firstName: 'Kevin',
  lastName: 'Daniel',
};

export default user;
