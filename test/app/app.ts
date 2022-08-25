import 'module-alias/register';
import 'dotenv/config';
import { Application } from '@air/base';

import ConsoleLogger from '../utils/logging';
import apiRoutes from './routes';

const port = Number(process.env.DEV_PORT) || 3000;
const logger = ConsoleLogger(__filename);

const app = new Application();

app.use((req, _, next) => {
	logger.info(`${req.method} ${req.url}`);
	next();
});

app.use(apiRoutes);
app.static('/', './test/public/');

app.listen(port, () => {
	logger.info(`App listening on port ${port}`);
});
