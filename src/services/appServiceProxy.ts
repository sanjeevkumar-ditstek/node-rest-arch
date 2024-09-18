import * as IUserService from "./user/IUser";
import UserController from "./user/controller";
export interface IAppServiceProxy {
  user: typeof IUserService;
}
class AppServiceProxy implements IAppServiceProxy {
  public user;
  constructor() {
    this.user = new UserController(this);
  }
}
export default new AppServiceProxy();
