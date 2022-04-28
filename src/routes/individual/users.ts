import express from 'express';
import { index, showUser, createUser } from '../../controllers/users';

const usersRouter = express.Router();
usersRouter.get('/', index);
usersRouter.get('/:id', showUser);
usersRouter.post('/', createUser);

export default usersRouter;
