import {
	Controller,
	Get,
	Body,
	Patch,
	Param,
	Delete,
	Put,
	Post,
} from "@nestjs/common";
import { UserService } from "./user.service";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiBody, ApiTags } from "@nestjs/swagger";
import { DeleteResult } from "typeorm";

@ApiTags("User")
@Controller({
	path: "user",
	version: "1",
})
export class UserController {
	constructor(private readonly usersService: UserService) {}
	// @Get()
	// findAll() {
	// 	return this.usersService.findAll();
	// }

	// @Get(":id")
	// findOne(@Param("id") id: string) {
	// 	return this.usersService.findOne(+id);
	// }

	// @Patch(":id")
	// update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
	// 	return this.usersService.update(+id, updateUserDto);
	// }

	/**
	 * @TODO : Add permissions
	 */
	@Delete(":id")
	async remove(@Param("id") id: string): Promise<DeleteResult> {
		await this.usersService.delete(id);
		return;
	}
}
