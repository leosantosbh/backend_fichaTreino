import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
import UsersController from './app/controllers/UsersController';
import UserDetsController from './app/controllers/UserDetsController';

import UserFichasController from './app/controllers/UserFichasController';
import UserFichaDetalhesController from './app/controllers/UserFichaDetalhesController';

import ExerciciosController from './app/controllers/ExerciciosController';

import SessionController from './app/controllers/SessionController';

import AvatarController from './app/controllers/AvatarController';
import AvatarExerciciosController from './app/controllers/AvatarExerciciosController';

import authMid from './app/middlewares/auth';

const routes = new Router();

const upload = multer(multerConfig);

routes.post('/users', UsersController.store);
routes.put('/users', UsersController.update);
routes.post('/session', SessionController.store);

routes.use(authMid);

routes.get('/users', UsersController.index);
routes.get('/userdets', UserDetsController.index);
routes.put('/userdets/:id', UserDetsController.update);

routes.post('/avatars', upload.single('file'), AvatarController.store);
routes.post(
  '/avatarexercicios',
  upload.single('file'),
  AvatarExerciciosController.store
);

routes.get('/exercicios', ExerciciosController.index);
routes.post('/exercicios', ExerciciosController.store);
routes.put('/exercicios/:id', ExerciciosController.update);
routes.delete('/exercicios/:id', ExerciciosController.delete);

routes.get('/fichas', UserFichasController.index);
routes.post('/fichas', UserFichasController.store);
routes.put('/fichas/:id', UserFichasController.update);
routes.delete('/fichas/:id', UserFichasController.delete);

routes.get('/fichadet', UserFichaDetalhesController.index);
routes.post('/fichadet', UserFichaDetalhesController.store);
routes.put('/fichadet/:id', UserFichaDetalhesController.update);
routes.delete('/fichadet/:id', UserFichaDetalhesController.delete);

export default routes;
