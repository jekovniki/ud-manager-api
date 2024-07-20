import { NestFactory, Reflector } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe, VersioningType } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { CustomLogger } from "./configuration/logger/logger.module";
import cookieParser = require("cookie-parser");
import { AccessGuard } from "./common/guard/access.guard";

async function bootstrap() {
	const app = await NestFactory.create(AppModule, {
		bufferLogs: true,
	});
	app.useLogger(app.get(CustomLogger));
	const reflector = new Reflector();
	app.useGlobalGuards(new AccessGuard(reflector));
	const options = new DocumentBuilder()
		.setTitle("UD Manager API")
		.setDescription("List of all APIs for the UD Manager")
		.setVersion("1.0")
		.addServer("http://localhost:3000/", "Local environment")
		.build();

	const document = SwaggerModule.createDocument(app, options);
	SwaggerModule.setup("api-docs", app, document);

	app.use(cookieParser());
	app.setGlobalPrefix("api");
	app.enableVersioning({
		type: VersioningType.URI,
	});
	app.useGlobalPipes(new ValidationPipe());

	await app.listen(3000);
}

process.on("unhandledRejection", (reason, promise) => {
	console.error("Unhandled Rejection at:", promise, "reason:", reason);
});
bootstrap();
