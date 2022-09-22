import { Request, Response } from '@air/base';

const jsonParser = (body: string): Record<string, unknown> => JSON.parse(body) as Record<string, unknown>;

const formParser = (body: string): Record<string, unknown> =>
	body.split('&').reduce((acc: Record<string, unknown>, pair) => {
		const [key, value] = pair.split('=');
		acc[key] = decodeURIComponent(value);
		return acc;
	}, {});

const textParser = (body: string): string => body;

const PARSERS: Record<string, (body: string) => Record<string, unknown> | string> = {
	'application/json': jsonParser,
	'application/x-www-form-urlencoded': formParser,
	'text/plain': textParser,
};

const bodyParser = (req: Request, res: Response, next: () => void) => {
	let body = '';
	req.on('data', (chunk) => {
		body += chunk;
	});
	req.on('end', () => {
		try {
			const contentType = req.headers['content-type'] as keyof typeof PARSERS;
			const parser = PARSERS[contentType];
			if (parser) {
				req.body = parser(body) as Record<string, unknown>;
			}
		} catch (error) {
			throw new Error('Unsupported content-type');
		}
		next();
	});
};

export default bodyParser;
