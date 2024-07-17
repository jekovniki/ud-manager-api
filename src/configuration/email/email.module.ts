import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./email.service";
import { HandlebarsAdapter } from "@nestjs-modules/mailer/dist/adapters/handlebars.adapter";
import { join } from "path";

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.EMAIL_HOST,
				port: Number(process.env.EMAIL_PORT),
				auth: {
					user: process.env.EMAIL_USERNAME,
					pass: process.env.EMAIL_PASSWORD,
				},
			},
			defaults: {
				from: '"АМС Мениджър" <noreply@amc-manager.com>',
			},
			template: {
				dir: join(
					__dirname,
					"..",
					"..",
					"..",
					"src",
					"configuration",
					"email",
					"templates",
				),
				adapter: new HandlebarsAdapter(),
				options: {
					strict: true,
				},
			},
		}),
	],
	providers: [EmailService],
})
export class EmailModule {}
