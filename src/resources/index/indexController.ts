import { Request, Response } from 'express';
import ResponseMiddleware from '../../middleware/response';

class IndexController {
  public getIndexReponse = async (req:Request, res:Response):Promise<Response | void> => {
    const message = 'Task manager application api';
    return ResponseMiddleware.successResponse(res, '', message);
  };
}

export default IndexController;
