import path from 'path';
import fs from 'fs';
import { Request, Response } from '@air/base';

const MIME_TYPES = {
	'.html': 'text/html',
	'.js': 'text/javascript',
	'.css': 'text/css',
	'.txt': 'text/plain',
	'.jpg': 'image/jpeg',
	'.jpeg': 'image/jpeg',
	'.png': 'image/png',
	'.gif': 'image/gif',
	'.ico': 'image/x-icon',
	'.svg': 'image/svg+xml',
	'.json': 'application/json',
	'.woff': 'application/font-woff',
	'.ttf': 'application/font-ttf',
	'.pdf': 'application/pdf',
	'.mp4': 'video/mp4',
	'.mpeg': 'video/mpeg',
	'.ogg': 'video/ogg',
	'.mp3': 'audio/mpeg',
	'.webm': 'video/webm',
	'.zip': 'application/zip',
	'.rar': 'application/x-rar-compressed',
	'.tar': 'application/x-tar',
};

const serveStaticContent = (URL: string, dir: string) => {
	const middleware = (req: Request, res: Response, next: () => void) => {
		let resourcePath = req.url.pathname as string;
		if (!resourcePath?.startsWith(URL)) {
			next();
		}

		if (resourcePath === URL) {
			resourcePath = '/index.html';
		}

		const fileName = path.join(dir, resourcePath);

		try {
			if (fs.lstatSync(fileName).isDirectory()) {
				const files = fs.readdirSync(fileName);
				const html = `<!DOCTYPE html><html><head><title>${resourcePath}</title></head><body><h1>${resourcePath}</h1><ul>${files
					.map((file) => `<li><a href="${resourcePath}/${file}">${file}</a></li>`)
					.join('')}</ul></body></html>`;
				res.setHeader('Content-Type', 'text/html');
				res.send(html);
			} else {
				const data = fs.readFileSync(fileName).toString();
				const ext = fileName.substring(fileName.lastIndexOf('.')) as keyof typeof MIME_TYPES;
				res.setHeader('Content-Type', MIME_TYPES[ext] || 'text/plain');
				res.send(data);
			}
		} catch (error) {
			next();
		}
	};

	return middleware;
};

export default serveStaticContent;
