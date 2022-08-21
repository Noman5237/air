import Request from '../request';
import Response from '../response';

type Handler = (req: Request, res: Response, next: () => void) => void;

export default Handler;
