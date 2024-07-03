import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const options = new DocumentBuilder()
		.setTitle("UD Manager API")
		.setDescription("List of all APIs for the UD Manager")
		.setVersion("1.0")
		.addServer("http://localhost:3000/", "Local environment")
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("api-docs", app, document);

	app.setGlobalPrefix("api");
	app.enableVersioning({
		type: VersioningType.URI,
	});

	await app.listen(3000);
}
bootstrap();
