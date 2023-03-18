import express from 'express';
import UserMidddleware from '../middlewares/user';
import UserController from '../controllers/user';
import user from '../validations/user';
import validationMiddleware from '../../../middleware/validationMiddleware';

const router = express.Router();
const userController = new UserController();
const userMidddleware = new UserMidddleware();

router.post(
  '/create',
  validationMiddleware(user.createUser),
  userMidddleware.createUser,
  userController.createUser,
);
router.post(
  '/login',
  validationMiddleware(user.loginUser),
  userController.loginUser,
);

export default router;
