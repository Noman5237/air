import http, { RequestListener } from 'http';

const createApplication = (callback: RequestListener) => http.createServer(callback);

export default createApplication;
