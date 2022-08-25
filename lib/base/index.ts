import Application from './application';
import Request from './request';
import Response from './response';
import Middleware from './middleware';
import Router from './router';

import serveStaticContent from './middlewares/serveStatic';
import Handler from './interfaces/handler';

const Middlewares = {
	serveStatic: serveStaticContent,
};

export { Application, Request, Response, Middleware, Router, Handler, Middlewares };
