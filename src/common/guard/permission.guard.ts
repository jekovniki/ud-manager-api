import { CanActivate, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Observable } from "rxjs";
import { PERMISSION_KEY } from "../decorator/permission.decorator";

export class PermissionGuard implements CanActivate {
	constructor(private reflector: Reflector) {}

	canActivate(
		context: ExecutionContext,
	): boolean | Promise<boolean> | Observable<boolean> {
		const requiredPermissions = this.reflector.getAllAndOverride<string[]>(
			PERMISSION_KEY,
			[context.getHandler(), context.getClass()],
		);
		if (!requiredPermissions) {
			return true;
		}

		const { user } = context.switchToHttp().getRequest();

		return requiredPermissions.some((permission) =>
			user.permissions.includes(permission),
		);
	}
}
