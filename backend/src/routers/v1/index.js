import express from 'express';
import quotesRouter from './quotes.route.js';

const v1Router = express.Router();

v1Router.use('/quotes', quotesRouter);

export default v1Router;