interface ITask {
  id?:string,
  title: string,
  status: string,
  description: string,
  userId?: string
  createdAt?: Date
  updatedAt?: Date
}

export default ITask;
