import express from 'express';
import {getEntries, getEntryById, postEntry, editEntry, deleteEntry} from '../controllers/entry-controller.js';
import {authenticateToken} from '../middlewares/authentication.js';

const entryRouter = express.Router();

// sll routes to /api/entries
entryRouter
  .route('/')
  .post(authenticateToken, postEntry)
  .get(authenticateToken, getEntries);

//all routes to /api/entries/:id
entryRouter.route('/:id')
  .get(getEntryById)
  .put(editEntry)
  .delete(deleteEntry);

export default entryRouter;