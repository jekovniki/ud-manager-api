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

	public sendRegistrationMail(
		to: string,
		companyName: string,
		registrationLink: string,
	) {
		try {
			this.sendMail(
				to,
				"AMC Manager | Регистрация",
				`Здравей, 
				Получаваш този мейл, защото ${companyName} те регистрира като служител в AMC Manager.
				
				Довърши регистрацията си, за да можеш да ползваш системата пълноценно:
				${registrationLink}`,
				this.companyEmail,
			);
		} catch (error) {
			console.error(error);
		}
	}
}
