import http from 'http';
import fs from 'fs';
import path from 'path';

import Request from './request';
import Response from './response';
import Middleware from './middleware';
import Handler from './interfaces/handler';

const MIME_TYPES = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.txt': 'text/plain',
};

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

	static(url: string, dir: string) {
		this.use((req, res, next) => {
			if (!req.url.startsWith(url)) {
				next();
			}

			const fileName = path.join(dir, req.url);

			try {
				const data = fs.readFileSync(fileName).toString();
				const ext = fileName.substring(fileName.lastIndexOf('.')) as keyof typeof MIME_TYPES;
				res.setHeader('Content-Type', MIME_TYPES[ext] || 'text/plain');
				res.send(data);
			} catch (error) {
				next();
			}
		});
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
