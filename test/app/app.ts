import 'module-alias/register';
import 'dotenv/config';
import air from '@air/base';
import ConsoleLogger from '../utils/logging';

const port = process.env.DEV_PORT || 3000;
const logger = ConsoleLogger(__filename);

const app = air.createApplication((req?, res?) => {
	logger.info(`${req.method as string} ${req.url as string} ${req.httpVersion}`);
	res.writeHead(200, { 'Content-Type': 'text/html' });
	res.write('<h1>Hello World</h1>');
	res.end();
});

app
	.listen(port, () => {
		logger.info(`App listening on port ${port}`);
	})
	.on('error', (err) => {
		logger.error(err);
	});
