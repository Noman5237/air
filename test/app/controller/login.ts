import { Request, Response } from '@air/base';

import ConsoleLogger from '../../utils/logging';

const logger = ConsoleLogger(__filename);

const login = (req: Request, res: Response) => {
	logger.verbose(JSON.stringify(req.body));
	res.send('Data recorded');
};

export default login;
