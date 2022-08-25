import { Request, Response } from '@air/base';

const login = (req: Request, res: Response) => {
	console.table(req.body);
	res.send('Data recorded');
};

export default login;
