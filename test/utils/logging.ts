import winston, { Logger } from 'winston';

const ConsoleLogger = (filename: string): Logger => {
	const baseName = filename.split('/').pop() || 'undefined-context';
	return winston.createLogger({
		transports: [
			new winston.transports.Console({
				format: winston.format.combine(
					winston.format.colorize(),
					winston.format.timestamp(),
					winston.format.align(),
					winston.format.printf((info) => `${baseName} ${info.level}: ${info.message as string}`),
				),
			}),
		],
	});
};

export default ConsoleLogger;
