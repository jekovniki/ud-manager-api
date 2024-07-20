import { ConsoleLogger, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Inject } from "@nestjs/common";

const { Loggly } = require("winston-loggly-bulk");

@Injectable()
export class CustomLogger extends ConsoleLogger {
	constructor(
		@Inject(WINSTON_MODULE_PROVIDER) private winstonLogger: Logger,
		context?: string,
	) {
		super(context);
		if (process.env.NODE_ENV && process.env.NODE_ENV !== "development") {
			this.winstonLogger.add(
				new Loggly({
					token: process.env.LOG_MANAGEMENT_TOKEN,
					subdomain: process.env.LOG_MANAGEMENT_SUBDOMAIN,
					tags: [process.env.LOG_MANAGEMENT_DEFAULT_TAG],
					json: true,
				}),
			);
		}
	}

	log(message: string, context?: string) {
		super.log.apply(this, [message, context]);
		this.winstonLogger.info(message, { context });
	}

	error(message: string, trace?: string, context?: string) {
		super.error.apply(this, [message, trace, context]);
		this.winstonLogger.error(message, { context, trace });
	}

	warn(message: string, context?: string) {
		super.warn.apply(this, [message, context]);
		this.winstonLogger.warn(message, { context });
	}

	debug(message: string, context?: string) {
		super.debug.apply(this, [message, context]);
		this.winstonLogger.debug(message, { context });
	}

	verbose(message: string, context?: string) {
		super.verbose.apply(this, [message, context]);
		this.winstonLogger.verbose(message, { context });
	}
}
