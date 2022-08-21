import { IncomingMessage } from 'http';

class Request {
	private incomingMessage: IncomingMessage;
	public method: string;
	public url: string;

	constructor(incomingMessage: IncomingMessage) {
		this.incomingMessage = incomingMessage;
		this.method = incomingMessage.method as string;
		this.url = incomingMessage.url as string;
	}

	public toString(): string {
		return JSON.stringify(this.incomingMessage);
	}
}

export default Request;
