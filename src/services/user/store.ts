import IUSER from "../../utils/interface/IUser";
import UserModel from "../../models/userModel";

export default class UserStore {
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super("An error occured while processing the request.");
    }
  };

  /**
   * creating new user and saving in Database
   */
  async createUser(userInput): Promise<IUSER> {
    let savedUser;
    try {
      savedUser = await UserModel.create(userInput);
    } catch (error) {
      return error;
    }
    return savedUser;
  }

  /**
   *Get by email
   */
  public async getByEmail(email: string): Promise<IUSER> {
    try {
      const user: any = await UserModel.findOne({ where: { email }, raw: true });
      return user;
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
  }

  /**
   *Get by id
   */
  public async getById(id: string): Promise<IUSER> {
    try {
      const user: any = await UserModel.findOne({ id });
      return user;
    } catch (e) {
      return Promise.reject(new UserStore.OPERATION_UNSUCCESSFUL());
    }
  }
}
