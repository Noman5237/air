import 'module-alias/register';
import 'dotenv/config';
import { Application, Middlewares } from '@air/base';

import ConsoleLogger from '../utils/logging';
import apiRoutes from './routes';

const port = Number(process.env.DEV_PORT) || 3000;
const logger = ConsoleLogger(__filename);

const app = new Application();

app.use((req, _, next) => {
	logger.info(`${req.method} ${req.url.pathname!} ${JSON.stringify(req.url.query)}`);
	next();
});

app.use(Middlewares.bodyParser);

app.use(apiRoutes);
app.use(Middlewares.serveStaticContent('/', './test/public'));

app.listen(port, () => {
	logger.info(`App listening on port ${port}`);
});
