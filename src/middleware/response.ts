import { Response } from 'express';
import LOG from 'debug';

const ErrorScope = 'staff:response';
const DEBUG = LOG(ErrorScope);

export default class ResponseMiddleware {
  static errorResponse(res: Response, error: any, message = '', statusCode = 400, data = null) {
    const status = error.statusCode || statusCode;
    const respMessage = message || error.message || 'Something went wrong';
    DEBUG('Error payload - %O', {
      message: respMessage,
      status,
      data,
    });
    return res.status(status).send({
      status: false, message: respMessage, data,
    });
  }

  static successResponse(res: Response, data: any, message: string, statusCode = 200) {
    return res.status(statusCode).send({
      status: true, message, data,
    });
  }
}
