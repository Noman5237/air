import { ServerResponse } from 'http';

// TODO: Can we implement prototype based inheritance?

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

	setHeader(name: string, value: string) {
		this.serverResponse.setHeader(name, value);
	}

	send(body: string) {
		this.serverResponse.write(body);
		this.serverResponse.end();
	}

	status(status: number) {
		this.serverResponse.statusCode = status;
		return this;
	}

	get sent() {
		return this.serverResponse.writableEnded;
	}

	public toString(): string {
		return JSON.stringify(this);
	}
}

export default Response;
