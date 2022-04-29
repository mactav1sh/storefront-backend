import express from 'express';
import { index, showUser, createUser } from '../../controllers/users';
import validateToken from '../../middleware/validateToken';

const usersRouter = express.Router();

//Routes
usersRouter.get('/', validateToken, index);
usersRouter.get('/:id', validateToken, showUser);
usersRouter.post('/', validateToken, createUser);

export default usersRouter;
