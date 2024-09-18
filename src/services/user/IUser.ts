import IUSER from "../../utils/interface/IUser";
import { IResponse } from "../../utils/interface/common";
import { Request } from "express";

export interface IUserServiceAPI {
	createUser(request: IRegisterUserRequest, response: IRegisterUserResponse);
	login(request: ILoginUserRequest, response: ILoginUserResponse);
	getUserById(request: IGetUserRequest, response: IGetUserResponse);
}

/********************************************************************************
 *  Create user
 ********************************************************************************/
export interface IRegisterUserRequest extends Request {
	name: string;
	age: number;
	email: string;
	password: string;
	status: string;
}

export interface IRegisterUserResponse extends IResponse {
	user?: IUSER;
}

/********************************************************************************
 * Login
 ********************************************************************************/
export interface ILoginUserRequest extends Request {
	email: string;
	password: string;
}
export interface ILoginUserResponse extends IResponse {
	user?: IUSER;
	token?: string;
}

/********************************************************************************
 *  Get user
 ********************************************************************************/

export interface IGetUserRequest extends Request {
	id: string;
}
export interface IGetUserResponse extends IResponse {
	user?: IUSER;
}
