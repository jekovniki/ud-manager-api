import { Injectable } from "@nestjs/common";
import { ConfigService } from "@nestjs/config";
import { createUploadthing, type FileRouter } from "uploadthing/next";

const f = createUploadthing();

@Injectable()
export class FileManagerService {
	private fileRouter: FileRouter;

	constructor(private configService: ConfigService) {
		const maxFileSize = this.configService.getOrThrow("FILES_S3_MAX_FILE");
		this.fileRouter = {
			imageUploader: f({ image: { maxFileSize } }).onUploadComplete(
				async ({ metadata, file }) => {
					console.log("Upload complete for userId:", metadata);
					console.log("file url", file.url);

					return { success: true, fileUrl: file.url };
				},
			),
		};
	}

	public getFileRouter(): FileRouter {
		return this.fileRouter;
	}

	async uploadCompanyLogo(
		file: Express.Multer.File,
		metadata: { companyId: string; companyName: string },
	) {
		const formData = new FormData();
		formData.append("files", new Blob([file.buffer]), file.originalname);
		formData.append("metadata", JSON.stringify(metadata));

		const response = await fetch("/api/uploadthing", {
			method: "POST",
			body: formData,
		});

		if (!response.ok) {
			throw new Error("Upload failed");
		}

		const result = await response.json();
		return result;
	}
}
