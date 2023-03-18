import express from 'express';
import IndexRoutes from '../resources/index/indexRoutes';
import userRoute from '../resources/user/routes/user';
import taskRoute from '../resources/task/routes/task';

const APP_BASE_ROUTE = '/api/v1';

const attachRoutes = (app: express.Application): void => {
  app.use('/', IndexRoutes);
  app.use(`${APP_BASE_ROUTE}/users`, userRoute);
  app.use(`${APP_BASE_ROUTE}/tasks`, taskRoute);
};

export default attachRoutes;
