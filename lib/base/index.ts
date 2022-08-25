import Application from './application';
import Request from './request';
import Response from './response';
import Middleware from './middleware';
import Router from './router';

import Handler from './interfaces/handler';

import serveStaticContent from './middlewares/serveStatic';
import bodyParser from './middlewares/bodyParser';

const Middlewares = {
	serveStaticContent,
	bodyParser,
};

export { Application, Request, Response, Middleware, Router, Handler, Middlewares };
