import STATUS_CODES from "../../utils/enum/StatusCodesEnum";
import SendResponse from "../../utils/middlewares/commonResponse";
import Store from "./store";
import pluralize from "../../utils/pluralize";
export default class CommonService {
  private commonStore: Store;
  private entityName: any;
  constructor(model) {
    this.commonStore = new Store(model);
    this.entityName = model.modelName.toLowerCase() || "entity";
  }
  public async create(_, res, data) {
    const entity = await this.commonStore.create(data);
    return SendResponse(res, {
      status: STATUS_CODES.OK,
      [this.entityName]: entity,
    });
  }

  public async update(_, res, attribute, data) {
    const entity = await this.commonStore.update(attribute, data);
    return SendResponse(res, {
      status: STATUS_CODES.OK,
      [this.entityName]: entity,
    });
  }

  public async getByAttribute(_, res, attribute: {}) {
    const entities = await this.commonStore.getByAttribute(attribute);
    return SendResponse(res, {
      status: STATUS_CODES.OK,
      [pluralize(this.entityName)]: entities,
    });
  }

  public async getOneByAttribute(_, res, attribute: {}) {
    const entity = await this.commonStore.getOneByAttribute(attribute);
    return SendResponse(res, {
      status: STATUS_CODES.OK,
      [this.entityName]: entity,
    });
  }
}
