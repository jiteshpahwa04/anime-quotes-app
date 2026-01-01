import express from 'express';
import { serverConfig } from './config/server.config.js';
import apiRouter from './routers/index.js';
import cors from 'cors';

const app = express();

app.use(cors())

app.use(express.json());
app.use('/api', apiRouter);

app.listen(serverConfig.PORT, () => {
    console.log("Server is running on port: " + serverConfig.PORT);
})