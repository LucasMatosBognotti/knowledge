import { Router } from 'express';

import UserController from './controller/UserController';
import SessionController from './controller/SessionController';

const routes = new Router();

routes.post('/users', UserController.store);

routes.post('/sessions', SessionController.store);

export default routes;
