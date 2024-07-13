import { Module } from "@nestjs/common";
import { FileManagerService } from "./file-manager.service";

@Module({
	imports: [],
	providers: [FileManagerService],
	controllers: [],
})
export class FileManagerModule {}
