import SendResponse from "../../utils/middlewares/commonResponse";
import { toError } from "../../utils/interface/common";
import STATUS_CODES from "../../utils/enum/StatusCodesEnum";
import Response from "express";
const checkIfValidUUID = (str) => {
	const regexExp =
		/^[0-9a-fA-F]{8}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{4}\b-[0-9a-fA-F]{12}$/gi;

	return regexExp.test(str);
};
export function validate(value: any, res?: Response) {
	if (!checkIfValidUUID(value)) {
		const response: any = {};
		response.status = STATUS_CODES.BAD_REQUEST;
		response.error = toError("Invalid UUID");
		return response;
	}
}
