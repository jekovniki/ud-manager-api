import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Put,
} from "@nestjs/common";
import { UsersService } from "./users.service";
import { CompleteUserRegistration, CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { ApiTags } from "@nestjs/swagger";

@ApiTags("User")
@Controller("users")
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Get()
	findAll() {
		return this.usersService.findAll();
	}

	@Put(":id")
	completeUser(
		@Param("id") id: string,
		userRegistration: CompleteUserRegistration,
	) {
		try {
			return this.usersService.completeRegistration(id, userRegistration);
		} catch (error) {
			return null;
		}
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.usersService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.usersService.remove(+id);
	}
}
