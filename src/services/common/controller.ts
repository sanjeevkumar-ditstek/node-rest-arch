import STATUS_CODES from "../../utils/enum/StatusCodesEnum";
import SendResponse from "../../utils/middlewares/commonResponse";
import Store from "./store";
import pluralize from "../../utils/pluralize";
import { IResponse } from "src/utils/interface/common";
export default class CommonService {
  private commonStore: Store;
  private entityName: any;
  constructor(model) {
    this.commonStore = new Store(model);
    this.entityName = model.modelName.toLowerCase() || "entity";
  }
  /**
   * Desc: create methods for common(provided) entity
   * @param  {} _
   * @param  {} res
   * @param  {} data
   */
  public async create(_, res: IResponse, data) {
    const entity = await this.commonStore.create(data);
    return SendResponse(res, {
      status: STATUS_CODES.OK,
      [this.entityName]: entity,
    });
  }

  /**
   * Desc: Update methods for common(provided) entity
   * @param  {} _
   * @param  {} res
   * @param  {} attribute
   * @param  {} data
   */
  public async update(_, res: IResponse, attribute, data) {
    const entity = await this.commonStore.update(attribute, data);
    return SendResponse(res, {
      status: STATUS_CODES.OK,
      [this.entityName]: entity,
    });
  }

  /**
   * Desc: get list of item for common(provided) entity with provided filters
   * @param  {} _
   * @param  {} res
   * @param  {{}} attribute
   */
  public async getByAttribute(_, res: IResponse, attribute: {}) {
    const entities = await this.commonStore.getByAttribute(attribute);
    return SendResponse(res, {
      status: STATUS_CODES.OK,
      [pluralize(this.entityName)]: entities,
    });
  }

  /**
   * Desc: get one item  based on filters for common(provided) entity
   * @param  {} _
   * @param  {} res
   * @param  {{}} attribute
   */
  public async getOneByAttribute(_, res: IResponse, attribute: {}) {
    const entity = await this.commonStore.getOneByAttribute(attribute);
    return SendResponse(res, {
      status: STATUS_CODES.OK,
      [this.entityName]: entity,
    });
  }
}
