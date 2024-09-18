import Joi from "joi";
import UserStore from "./store";
import IUSER from "../../utils/interface/IUser";
import * as IUserService from "./IUser";
import { IAppServiceProxy } from "../appServiceProxy";
import { toError } from "../../utils/interface/common";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "../../env";
import { validate } from "../../utils/middlewares/validateUUID";
import SendResponse from "../../utils/middlewares/commonResponse";
import CommonController from "../common/controller";
import UserModel from "../../models/userModel";
export default class UserController extends CommonController {
  public store;
  private proxy: IAppServiceProxy;

  constructor(proxy: IAppServiceProxy) {
    const store = new UserStore();
    super(UserModel);
    this.store = store;
    this.proxy = proxy;
    this.getByAttribute = this.getByAttribute.bind(this);
  }
  createUser(
    request: IUserService.IRegisterUserRequest,
    response: IUserService.IRegisterUserResponse,
  ) {
    throw new Error("Method not implemented.");
  }
  login(request: IUserService.ILoginUserRequest, response: IUserService.ILoginUserResponse) {
    throw new Error("Method not implemented.");
  }
  getUserById(request: IUserService.IGetUserRequest, response: IUserService.IGetUserResponse) {
    throw new Error("Method not implemented.");
  }

  /*****Generate a Token*****/
  private generateJWT = (user: IUSER): string => {
    const payLoad = {
      id: user.id,
      email: user.email,
    };
    return jwt.sign(payLoad, JWT_SECRET);
  };

  //   /**
  //    * Creating new user
  //    */
  //   public createUser = async (
  //     request: IUserService.IRegisterUserRequest,
  //     res: IUserService.IRegisterUserResponse,
  //   ) => {
  //     const response: IUserService.IRegisterUserResponse = {
  //       status: STATUS_CODES.UNKNOWN_CODE,
  //     };
  //     const schema = Joi.object().keys({
  //       name: Joi.string().required(),
  //       age: Joi.number().optional(),
  //       email: Joi.string().email().required(),
  //       password: Joi.string().required(),
  //       status: Joi.string().optional(),
  //     });
  //     const params = schema.validate(request.body);

  //     if (params.error) {
  //       console.error(params.error);
  //       response.status = STATUS_CODES.UNPROCESSABLE_ENTITY;
  //       response.error = toError(params.error.details[0].message);
  //       return SendResponse(res, response);
  //     }
  //     const { name, age, email, password, status } = params.value;

  //     // Check if email is already registered
  //     let existingUser: IUSER;
  //     try {
  //       existingUser = await this.userStore.getByEmail(email);

  //       //Error if email id is already exist
  //       if (existingUser && existingUser?.email) {
  //         response.status = STATUS_CODES.BAD_REQUEST;
  //         // response.error = toError(ErrorMessageEnum.EMAIL_ALREADY_EXIST);
  //         return SendResponse(res, response);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
  //       response.error = toError(e.message);
  //       return SendResponse(res, response);
  //     }

  //     //Hashing password
  //     const hashPassword = await bcrypt.hash(password, 10);

  //     //Save the user to storage
  //     const attributes: IUSER = {
  //       name,
  //       age,
  //       email: email.toLowerCase(),
  //       password: hashPassword,
  //       status,
  //     };

  //     let user: IUSER;
  //     try {
  //       user = await this.userStore.createUser(attributes);
  //     } catch (e) {
  //       console.error(e);
  //       response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
  //       response.error = toError(e.message);
  //       return SendResponse(res, response);
  //     }
  //     response.status = STATUS_CODES.OK;
  //     response.user = user;
  //     return SendResponse(res, response);
  //   };

  //   /**
  //    * User login
  //    */
  //   public login = async (
  //     request: IUserService.ILoginUserRequest,
  //     res: IUserService.ILoginUserResponse,
  //   ) => {
  //     const response: IUserService.ILoginUserResponse = {
  //       status: STATUS_CODES.UNKNOWN_CODE,
  //     };
  //     const schema = Joi.object().keys({
  //       email: Joi.string().email().required(),
  //       password: Joi.string().required(),
  //     });
  //     const params = schema.validate(request.body);

  //     if (params.error) {
  //       console.error(params.error);
  //       response.status = STATUS_CODES.UNPROCESSABLE_ENTITY;
  //       response.error = toError(params.error.details[0].message);
  //       return SendResponse(res, response);
  //     }
  //     const { email, password } = params.value;
  //     let user: IUSER;
  //     try {
  //       //get user bu email id to check it exist or not
  //       user = await this.userStore.getByEmail(email);
  //       //if credentials are incorrect
  //       if (!user) {
  //         response.status = STATUS_CODES.UNAUTHORIZED;
  //         // response.error = toError(ErrorMessageEnum.INVALID_CREDENTIALS);
  //         return SendResponse(res, response);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
  //       response.error = toError(e.message);
  //       return SendResponse(res, response);
  //     }

  //     //comparing password to insure that password is correct
  //     const isValid = await bcrypt.compare(password, user?.password);

  //     //if isValid or user.password is null
  //     if (!isValid || !user?.password) {
  //       response.status = STATUS_CODES.UNAUTHORIZED;
  //       //   response.error = toError(ErrorMessageEnum.INVALID_CREDENTIALS);
  //       return SendResponse(res, response);
  //     }
  //     response.status = STATUS_CODES.OK;
  //     response.token = this.generateJWT(user);
  //     response.user = user;
  //     return SendResponse(res, response);
  //   };

  //   /**
  //    * Get user by Id
  //    */
  //   public getUserById = async (
  //     request: IUserService.IGetUserRequest,
  //     res: IUserService.IGetUserResponse,
  //   ) => {
  //     const response: IUserService.IGetUserResponse = {
  //       status: STATUS_CODES.UNKNOWN_CODE,
  //     };

  //     const schema = Joi.object().keys({
  //       id: Joi.string().required(),
  //     });

  //     const params = schema.validate(request.params);

  //     if (params.error) {
  //       console.error(params.error);
  //       response.status = STATUS_CODES.UNPROCESSABLE_ENTITY;
  //       response.error = toError(params.error.details[0].message);
  //       return SendResponse(res, response);
  //     }

  //     const { id } = params.value;

  //     // validate if id is valid UUID
  //     try {
  //       const validateId = await validate(id);
  //       if (validateId?.error) {
  //         response.status = STATUS_CODES.BAD_REQUEST;
  //         // response.error = toError(ErrorMessageEnum.INVALID_UUID);
  //         return SendResponse(res, response);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
  //       response.error = toError(e.message);
  //       return SendResponse(res, response);
  //     }

  //     let user: IUSER;
  //     try {
  //       user = await this.userStore.getById(id);

  //       //if user's id is incorrect
  //       if (!user) {
  //         response.status = STATUS_CODES.BAD_REQUEST;
  //         // response.error = toError(ErrorMessageEnum.INVALID_USER_ID);
  //         return SendResponse(res, response);
  //       }
  //     } catch (e) {
  //       console.error(e);
  //       response.status = STATUS_CODES.INTERNAL_SERVER_ERROR;
  //       response.error = toError(e.message);
  //       return SendResponse(res, response);
  //     }
  //     response.status = STATUS_CODES.OK;
  //     response.user = user;
  //     return SendResponse(res, response);
  //   };
}
