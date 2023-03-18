import express from 'express';
import TaskController from '../controllers/taskController';
import auth from '../../../middleware/authentication';
import task from '../validations/task';
import validationMiddleware from '../../../middleware/validationMiddleware';

const router = express.Router();
const taskController = new TaskController();

router.get('/', auth, taskController.findAll);
router.post(
  '/',
  auth,
  validationMiddleware(task),
  taskController.create,
);
router.put(
  '/:id',
  auth,
  validationMiddleware(task),
  taskController.update,
);
router.delete('/:id', auth, taskController.delete);
router.get('/:id', auth, taskController.findOne);

export default router;
