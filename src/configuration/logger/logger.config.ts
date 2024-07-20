import {
	WinstonModuleOptions,
	utilities as nestWinstonModuleUtilities,
} from "nest-winston";
import * as winston from "winston";

const { Loggly } = require("winston-loggly-bulk");

export class LoggerConfig {
	private readonly options: WinstonModuleOptions;
	protected logger: winston.Logger;

	constructor() {
		this.options = {
			transports: [
				new winston.transports.Console({
					format: winston.format.combine(
						winston.format.errors({
							stack: true,
							traces: 3,
							depth: 5,
							reason: true,
						}),
						winston.format.colorize(),
						winston.format.timestamp({ format: "DD-MM-YYYY HH:mm:ss" }),
						winston.format.printf((info) => {
							let message = `${info.timestamp} [${info.context}] ${info.level} | ${info.message}`;
							message += info.stack ? `| Stack: \n ${info.stack}` : "";
							message += info.reason
								? ` | Reason \n ${JSON.stringify(info.reason)}`
								: "";
							return message;
						}),
						nestWinstonModuleUtilities.format.nestLike("MyApp", {
							prettyPrint: true,
						}),
					),
				}),
			],
		};

		this.logger = winston.createLogger({
			exitOnError: false,
			transports: this.options.transports,
			level: process.env.NODE_ENV === "prod" ? "info" : "debug",
		});

		if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") {
			this.logger.add(
				new Loggly({
					token: process.env.LOG_MANAGEMENT_TOKEN,
					subdomain: process.env.LOG_MANAGEMENT_SUBDOMAIN,
					tags: [process.env.LOG_MANAGEMENT_DEFAULT_TAG],
					json: true,
				}),
			);
		}
	}

	public console(
		options: Partial<winston.transports.ConsoleTransportOptions> = {},
	) {
		this.options.transports[0] = new winston.transports.Console({
			format: winston.format.combine(
				winston.format.timestamp(),
				winston.format.ms(),
				nestWinstonModuleUtilities.format.nestLike("MyApp", {
					prettyPrint: true,
				}),
			),
			...options,
		});
		return this;
	}

	public file(options: Partial<winston.transports.FileTransportOptions> = {}) {
		(this.options.transports as any).push(new winston.transports.File(options));
		return this;
	}

	public getConfig(): WinstonModuleOptions {
		return this.options;
	}
}
