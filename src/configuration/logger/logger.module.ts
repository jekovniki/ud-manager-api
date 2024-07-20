import { ConsoleLogger, Injectable } from "@nestjs/common";
import { WINSTON_MODULE_PROVIDER } from "nest-winston";
import { Logger } from "winston";
import { Inject } from "@nestjs/common";

const { Loggly } = require("winston-loggly-bulk");

@Injectable()
export class CustomLogger extends ConsoleLogger {
	private readonly isDev = process.env.NODE_ENV === "development";
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

	/**
	 * @note : I use the default logger for dev env because I like the colors
	 * I use loggly for staging and prod in order to have logs actually
	 */
	log(message: string, context?: string) {
		if (this.isDev) {
			super.log.apply(this, [message, context]);
		} else {
			this.winstonLogger.info(message, { context });
		}
	}

	error(message: string, trace?: string, context?: string) {
		if (this.isDev) {
			super.error.apply(this, [message, trace, context]);
		} else {
			this.winstonLogger.error(message, { context, trace });
		}
	}

	warn(message: string, context?: string) {
		if (this.isDev) {
			super.warn.apply(this, [message, context]);
		} else {
			this.winstonLogger.warn(message, { context });
		}
	}

	debug(message: string, context?: string) {
		if (this.isDev) {
			super.debug.apply(this, [message, context]);
		} else {
			this.winstonLogger.debug(message, { context });
		}
	}

	verbose(message: string, context?: string) {
		if (this.isDev) {
			super.verbose.apply(this, [message, context]);
		} else {
			this.winstonLogger.verbose(message, { context });
		}
	}
}
