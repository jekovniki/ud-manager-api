import { Module } from "@nestjs/common";
import { DatabaseModule } from "./database/database.module";
import { EmailModule } from "./email/email.module";
import { FileManagerModule } from "./file-manager/file-manager.module";

@Module({
	imports: [DatabaseModule, EmailModule, FileManagerModule],
	providers: [],
})
export class ConfigurationModule {}
