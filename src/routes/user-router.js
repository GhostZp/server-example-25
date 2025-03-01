import express from 'express';
import {body} from 'express-validator';
import {
  addUser,
  deleteUser,
  editUser,
  getUserById,
  getUsers,
} from '../controllers/user-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';
import {validationErrorHandler} from '../middlewares/error-handler.js';
const userRouter = express.Router();

// all routes to /api/users
userRouter
  .route('/')
  // only logged in user can fetch the user list
  .get(authenticateToken, getUsers)
  .post(
    body('username').trim().isLength({min: 3, max: 20}).isAlphanumeric(),
    body('password').trim().isLength({min: 8, max: 120}),
    body('email').trim().isEmail(),
    validationErrorHandler,
    addUser,
  );

// all routes to /api/users/:id
userRouter.route('/:id').get(getUserById).put(editUser).delete(deleteUser);

export default userRouter;