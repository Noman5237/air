import fs from 'fs';
import { Request, Response } from '@air/base';

const substituteTemplate = (template: string, data: Record<string, unknown>) =>
	template.replace(/{{([^}]+)}}/g, (_, key: string) => data[key as unknown as string] as string);

const information = (req: Request, res: Response) => {
	const templateFile = './test/public/templates/information.html';
	const template = fs.readFileSync(templateFile, 'utf8');
	const data = {
		method: req.method,
		path: req.url.pathname,
		query: JSON.stringify(req.url.search),
		// queries: req.body || '',
		queries: JSON.stringify(req.url.query),
	};
	const html = substituteTemplate(template, data);

	res.setHeader('Content-Type', 'text/html');
	res.send(html);
};

export default information;
