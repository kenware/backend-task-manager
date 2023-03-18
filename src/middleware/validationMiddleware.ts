import Joi from 'joi';
import {
  Request, Response, NextFunction, RequestHandler,
} from 'express';
import HTTP_STATUS_CODES from '../constants/httpStatusCode';
import ResponseMiddleware from './response';

const validationMiddleware = (schema:Joi.Schema): RequestHandler => async (
  req:Request,
  res:Response,
  next:NextFunction,
):Promise<void> => {
  const validationOption = {
    abortEarly: false,
    allowUnknown: true,
    stripUnknown: true,
  };
  try {
    const value = await schema.validateAsync(req.body, validationOption);
    req.body = value;
    next();
  } catch (error:any) {
    const { details } = error;
    const message = details.map((i:any) => i.message && i.message.replace(/['"]/g, '').replace(/mongo/g, '')).join(' and ');
    ResponseMiddleware.errorResponse(res, { message, status: HTTP_STATUS_CODES.BAD_REQUEST });
  }
};

export default validationMiddleware;
