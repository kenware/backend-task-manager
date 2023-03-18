import { Request, Response } from 'express';
import ITaskController from '../interfaces/taskController';
import ResponseMiddleware from '../../../middleware/response';
import TaskModel from '../models/task';
import UserModel from '../../user/models/user';

export default class TaskController implements ITaskController {
  async create(req: Request, res: Response) {
    try {
      const task = TaskModel.create({ ...req.body, userId: res.locals.user.id });
      const messsage = 'Task successfully fetched';
      return ResponseMiddleware.successResponse(res, task, messsage, 201);
    } catch (err) {
      return ResponseMiddleware.errorResponse(res, err);
    }
  }

  async update(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const carrier = await TaskModel.update(id, req.body);
      const messsage = 'Task successfully updated';
      return ResponseMiddleware.successResponse(res, carrier, messsage, 200);
    } catch (err) {
      return ResponseMiddleware.errorResponse(res, err);
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const isDeleted = await TaskModel.delete(id);
      const messsage = 'Task successfully deletedd';
      return ResponseMiddleware.successResponse(res, isDeleted, messsage, 204);
    } catch (err) {
      return ResponseMiddleware.errorResponse(res, err);
    }
  }

  async findAll(req: Request, res: Response) {
    try {
      const tasks = await TaskModel.findAll(req.query);
      const messsage = 'Tasks successfully fetched';
      return ResponseMiddleware.successResponse(res, tasks, messsage, 200);
    } catch (err) {
      return ResponseMiddleware.errorResponse(res, err);
    }
  }

  async findOne(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const task = TaskModel.findById(id);
      const userId = task?.userId;
      const user = UserModel.findById(`${userId}`);
      const messsage = 'Task detail successfully fetched';
      return ResponseMiddleware.successResponse(res, { task, user }, messsage, 200);
    } catch (err) {
      return ResponseMiddleware.errorResponse(res, err);
    }
  }
}
