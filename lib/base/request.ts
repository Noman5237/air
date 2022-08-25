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

	public toString(): string {
		return JSON.stringify(this.incomingMessage);
	}
}

export default Request;
