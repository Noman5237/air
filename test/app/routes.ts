import { Router } from '@air/base';

import login from './controller/login';
import information from './controller/information';

const apiRoutes = new Router();

apiRoutes.route('POST', '/login', login);
apiRoutes.route('GET', '/information', information);

export default apiRoutes;
