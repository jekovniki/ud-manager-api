import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { ConfigService } from "@nestjs/config";

@Injectable()
export class EmailService {
	constructor(
		private readonly mailService: MailerService,
		private readonly configService: ConfigService,
	) {}

	public async sendRegistrationMail(to: string, companyName: string, registrationLink: string) {
		await this.mailService.sendMail({
			from: this.configService.getOrThrow("EMAIL_USERNAME"),
			to,
			subject: "AMC Manager | Регистрация",
			template: "registration", // This should match the name of your template file without the extension
			context: { companyName, registrationLink }, // This is the context object that will be passed to the template
		});
	}
}
