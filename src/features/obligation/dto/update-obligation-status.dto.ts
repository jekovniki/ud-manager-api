import { IsEnum } from "class-validator";
import { ObligationStatus } from "../utils/enum.utils";

export class UpdateObligationStatus {
	@IsEnum(ObligationStatus)
	status: ObligationStatus;
}
