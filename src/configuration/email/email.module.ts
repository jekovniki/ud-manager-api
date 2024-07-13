import { Module } from "@nestjs/common";
import { MailerModule } from "@nestjs-modules/mailer";
import { EmailService } from "./email.service";

@Module({
	imports: [
		MailerModule.forRoot({
			transport: {
				host: process.env.EMAIL_HOST || "smtp.gmail.com",
				port: Number(process.env.EMAIL_PORT) || 587,
				auth: {
					user: process.env.EMAIL_USERNAME || "jekovniki95@gmail.com",
					pass: process.env.EMAIL_PASSWORD || "rush kdpf alot xgxb",
				},
			},
		}),
	],
	providers: [EmailService],
})
export class EmailModule {}
