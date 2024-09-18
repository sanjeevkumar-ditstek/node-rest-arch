import test from "node:test";
import * as IUserService from "./user/IUser";

import UserController from "./user/controller";

export interface IAppServiceProxy {
  user: any;
}

class AppServiceProxy {
  public user;

  constructor() {
    this.user = new UserController(this);
    // console.log(this.user.getByAttribute());
  }
}

export default new AppServiceProxy();
