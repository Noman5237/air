import Middleware from './middleware';
import Handler from './interfaces/handler';

class Router extends Middleware {
	constructor() {
		super((req, res, next) => {
			next();
		});
	}

	route(method: string, path: string, middleware: Middleware | Handler) {
		this.use((req, res, next) => {
			if (req.method === method && req.url === path) {
				if (middleware instanceof Middleware) {
					middleware.use(next);
					middleware.handle(req, res);
				} else {
					middleware(req, res, next);
				}
			} else {
				next();
			}
		});
	}
}

export default Router;
