import express from 'express';
import 'dotenv/config';

import apiRouter from './routes';
import ConsoleLogger from '../utils/logging';

const app = express();
const port = process.env.DEV_PORT || 3000;

app.use(apiRouter);
const logger = ConsoleLogger(__filename);

app.listen(port, () => {
	logger.info(`Example app listening on port ${port}`);
});
