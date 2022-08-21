import Request from './request';
import Response from './response';
import Handler from './interfaces/handler';

class Middleware {
	private next!: Middleware;
	private handler: Handler;

	constructor(handler: Handler) {
		this.handler = handler;
	}

	use(middleware: Middleware | Handler) {
		if (this.next) {
			this.next.use(middleware);
		} else if (middleware instanceof Middleware) {
			this.next = middleware;
		} else {
			this.next = new Middleware(middleware);
		}
	}

	handle(req: Request, res: Response) {
		this.handler(req, res, () => {
			if (this.next) {
				this.next.handle(req, res);
			}
		});
	}
}

export default Middleware;
