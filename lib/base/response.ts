import { ServerResponse } from 'http';

class Response {
	private serverResponse: ServerResponse;
	end: {
		(cb?: (() => void) | undefined): ServerResponse;
		(chunk: any, cb?: (() => void) | undefined): ServerResponse;
		(chunk: any, encoding: BufferEncoding, cb?: (() => void) | undefined): ServerResponse;
	};

	constructor(serverResponse: ServerResponse) {
		this.serverResponse = serverResponse;
		this.end = this.serverResponse.end.bind(this);
	}

	send(body: string) {
		this.serverResponse.writeHead(200, { 'Content-Type': 'text/plain' });
		this.serverResponse.write(body);
		this.serverResponse.end();
	}

	get sent() {
		return this.serverResponse.writableEnded;
	}

	public toString(): string {
		return JSON.stringify(this);
	}
}

export default Response;
