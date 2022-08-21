import http from 'http';

import Request from './request';
import Response from './response';
import Middleware from './middleware';
import Handler from './interfaces/handler';

class Application {
	private server: http.Server;
	private middleware!: Middleware;

	constructor() {
		this.server = http.createServer((req, res) => {
			if (this.middleware) {
				this.middleware.handle(new Request(req), new Response(res));
			}
		});
	}

	use(middleware: Middleware | Handler) {
		if (this.middleware) {
			this.middleware.use(middleware);
		} else if (middleware instanceof Middleware) {
			this.middleware = middleware;
		} else {
			this.middleware = new Middleware(middleware);
		}
	}

	listen(port: number, callback: () => void) {
		this.use((_, res) => {
			if (!res.sent) {
				res.status(404).send('Resource not found');
			}
		});
		this.server.listen(port, callback);
	}
}

export default Application;
