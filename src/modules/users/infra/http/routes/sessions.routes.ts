import { Router } from 'express';
import * as sessionController from '../controllers/sessionController';

const routes = Router();

routes.post('/', sessionController.create);

export default routes;
