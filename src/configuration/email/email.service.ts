import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";
import { join } from "path";

@Injectable()
export class EmailService {
	private readonly companyEmail = "";

	constructor(private readonly mailService: MailerService) {}

	public async sendRegistrationMail(
		to: string,
		companyName: string,
		registrationLink: string,
	) {
		console.log("Template name:", "registration");
		await this.mailService.sendMail({
			from: this.companyEmail,
			to,
			subject: "AMC Manager | Регистрация",
			template: "registration", // This should match the name of your template file without the extension
			context: { companyName, registrationLink }, // This is the context object that will be passed to the template
		});
	}
}
