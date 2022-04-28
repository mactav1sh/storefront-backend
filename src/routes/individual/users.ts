import express from 'express';
import { index, showUser, createUser } from '../../controllers/users';
import validateToken from '../../middleware/validateToken';

const usersRouter = express.Router();
usersRouter.get('/', validateToken, index);
usersRouter.get('/:id', validateToken, showUser);
usersRouter.post('/', createUser);

export default usersRouter;
