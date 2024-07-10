import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RoleService } from "./role.service";

@ApiTags("Roles")
@Controller({
	path: "roles",
	version: "1",
})
export class RoleController {
	constructor(private readonly roleService: RoleService) {}

	@Get()
	async findAll() {
		try {
			return this.roleService.findAll();
		} catch (error) {
			return null;
		}
	}
}
