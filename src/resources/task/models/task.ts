import { uid } from 'uid';
import ITask from '../interfaces/taskModel';

const tasks: Array<ITask> = [];

export default class TaskModel {
  static create(task: ITask): ITask {
    const data = {
      ...task,
      id: uid(32),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    tasks.push(data);
    return data;
  }

  static findAll(query = {}) {
    let newTasks = [...tasks];
    Object.entries(query).forEach(([key, value]) => {
      newTasks = newTasks.filter((task: any) => task[key] === value);
    });
    return newTasks;
  }

  static findById(id: string): ITask | undefined {
    const task = tasks.find((user: ITask) => user.id === id);
    return task;
  }

  static update(id: string, task: any): ITask | undefined {
    const taskTopUpdate: ITask | undefined = TaskModel.findById(id);
    if (!taskTopUpdate) throw new Error(`Task with an id "${id}" not found`);
    const index = tasks.indexOf(taskTopUpdate);
    tasks.splice(index, 1);
    const update = { ...taskTopUpdate, ...task, updatedAt: new Date() };
    tasks.splice(index, 0, update);
    return update;
  }

  static delete(id: any): Boolean {
    const taskTopDelete: ITask | undefined = TaskModel.findById(id);
    if (!taskTopDelete) throw new Error(`Task with an id "${id}" not found`);
    const index = tasks.indexOf(taskTopDelete);
    tasks.splice(index, 1);
    return true;
  }
}
