import url, { UrlWithParsedQuery } from 'url';
import { IncomingMessage, IncomingHttpHeaders } from 'http';

class Request {
	private incomingMessage: IncomingMessage;
	public method: string;
	public url!: UrlWithParsedQuery;
	public body: any;
	public headers: IncomingHttpHeaders;

	constructor(incomingMessage: IncomingMessage) {
		this.incomingMessage = incomingMessage;
		this.method = incomingMessage.method as string;
		this.url = url.parse(incomingMessage.url as string, true) || {};
		this.headers = incomingMessage.headers;
	}

	on(event: string, callback: (...args: any[]) => void) {
		this.incomingMessage.on(event, callback);
	}

	public toString(): string {
		return JSON.stringify(this.incomingMessage);
	}
}

export default Request;
