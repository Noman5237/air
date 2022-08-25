import { Router } from '@air/base';

const apiRoutes = new Router();

apiRoutes.route('POST', '/index.html', (req, res) => {
	console.table(req);
	res.send('Data recorded');
});

export default apiRoutes;
