import { Router } from '@air/base';

const apiRoutes = new Router();

apiRoutes.route('GET', '/', (_, res) => {
	res.send('Root!');
});

apiRoutes.route('GET', '/hello', (_, res) => {
	res.send('Hello!');
});

export default apiRoutes;
