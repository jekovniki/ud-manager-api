import { Controller, Get } from "@nestjs/common";
import { ApiTags } from "@nestjs/swagger";
import { RolesService } from "./roles.service";

@ApiTags("Roles")
@Controller({
	path: "roles",
	version: "1",
})
export class RolesController {
	constructor(private readonly roleService: RolesService) {}

	@Get()
	async findAll() {
		try {
			return this.roleService.findAll();
		} catch (error) {
			return null;
		}
	}
}
