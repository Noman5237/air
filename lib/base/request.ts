import url, { UrlWithParsedQuery } from 'url';
import { IncomingMessage } from 'http';

class Request {
	private incomingMessage: IncomingMessage;
	public method: string;
	public url!: UrlWithParsedQuery;

	constructor(incomingMessage: IncomingMessage) {
		this.incomingMessage = incomingMessage;
		this.method = incomingMessage.method as string;
		this.url = url.parse(incomingMessage.url as string, true) || {};
	}

	async data() {
		await new Promise((resolve, reject) => {
			const chunks: Buffer[] = [];
			this.incomingMessage
				.on('data', (chunk: Buffer) => {
					chunks.push(chunk);
				})
				.on('end', () => {
					resolve(chunks.concat());
				})
				.on('error', (error) => {
					reject(error);
				})
				.on('close', () => {
					reject(new Error('Connection closed'));
				})
				.on('timeout', () => {
					reject(new Error('Connection timeout'));
				})
				.on('aborted', () => {
					reject(new Error('Connection aborted'));
				})
				.on('clientError', (error) => {
					reject(error);
				});
		});
	}

	public toString(): string {
		return JSON.stringify(this.incomingMessage);
	}
}

export default Request;
