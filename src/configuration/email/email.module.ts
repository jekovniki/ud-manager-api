import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./email.service";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";
import { ConfigService } from "@nestjs/config";

@Module({
	imports: [
		MailerModule.forRootAsync({
			useFactory: (configService: ConfigService) => ({
				transport: {
					host: configService.getOrThrow("EMAIL_HOST"),
					port: configService.getOrThrow("EMAIL_PORT"),
					auth: {
						user: configService.getOrThrow("EMAIL_USERNAME"),
						pass: configService.getOrThrow("EMAIL_PASSWORD"),
					},
				},
				defaults: {
					from: `"АМС Мениджър" <${configService.getOrThrow("EMAIL_USERNAME")}>`,
				},
				template: {
					dir: join(process.cwd(), "templates"),
					adapter: new HandlebarsAdapter(),
					options: {
						strict: true,
					},
				},
			}),
			inject: [ConfigService],
		}),
	],
	providers: [EmailService],
})
export class EmailModule {}
