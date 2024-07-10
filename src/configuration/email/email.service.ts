import { Injectable } from "@nestjs/common";
import { MailerService } from "@nestjs-modules/mailer";

@Injectable()
export class EmailService {
	private readonly companyEmail = "";
	constructor(private readonly mailService: MailerService) {}

	public sendMail(to: string, subject: string, text: string, from: string) {
		this.mailService.sendMail({
			from,
			to,
			subject,
			text,
		});
	}

	public sendRegistrationMail(to: string) {
		this.sendMail(
			to,
			"AMC Manager | Регистрация",
			"You're receiving this email, because your company have registered",
			this.companyEmail,
		);
	}
}
