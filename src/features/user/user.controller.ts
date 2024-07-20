import {
	Controller,
	Get,
	Param,
	Delete,
	BadRequestException,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";
import { Permission } from "src/common/decorator/permission.decorator";
import { User } from "src/common/decorator/user.decorator";
import { RequestUserData } from "src/common/interface/server.interface";

@ApiTags("User")
@Controller({
	path: "user",
	version: "1",
})
export class UserController {
	constructor(private readonly usersService: UserService) {}

	@Get("/me")
	@Permission("user:READ")
	public async findOne(@User() user: RequestUserData) {
		const { password, refreshToken, ...data } =
			await this.usersService.findOneById(user.id);

		return data;
	}

	@Delete(":id")
	@Permission("user:DELETE")
	public async remove(
		@Param("id") id: string,
		@User() user: RequestUserData,
	): Promise<DeleteResult> {
		if (id === user.id) {
			throw new BadRequestException("You can't delete yourself");
		}
		await this.usersService.delete(id);
		return;
	}
}
