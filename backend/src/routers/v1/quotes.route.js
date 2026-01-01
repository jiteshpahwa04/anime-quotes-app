import express from 'express';
import { getQuotesByCharactersHandler, getQuotesByShowsHandler } from '../../controllers/character.controller.js';

const quotesRouter = express.Router();

quotesRouter.post('/character', getQuotesByCharactersHandler);
quotesRouter.post('/show', getQuotesByShowsHandler);

export default quotesRouter;