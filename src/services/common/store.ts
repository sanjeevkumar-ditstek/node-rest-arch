export default class Store {
  Model: any;
  constructor(model) {
    this.Model = model;
  }
  public static OPERATION_UNSUCCESSFUL = class extends Error {
    constructor() {
      super("An error occurred while processing the request.");
    }
  };

  async create(data): Promise<any> {
    let entity;
    try {
      entity = await this.Model.create(data);
    } catch (error) {
      console.log(error);
      return error;
    }
    return entity;
  }

  async update(attribute, data): Promise<any> {
    let entity;
    try {
      entity = await this.Model.findOneAndUpdate(attribute, data);
    } catch (error) {
      return error;
    }
    return entity;
  }

  /**
   *Get by email
   */
  public async getOneByAttribute(attribute: {} = {}): Promise<any> {
    try {
      let entity: any = await this.Model.findOne(attribute);
      return entity;
    } catch (e) {
      return Promise.reject(new Store.OPERATION_UNSUCCESSFUL());
    }
  }

  public async getByAttribute(attribute: {} = {}): Promise<any> {
    let entities = [];
    console.log("this.Model", this.Model);
    try {
      entities = await this.Model.find({});
    } catch (e) {
      console.log(e);
      return Promise.reject(new Store.OPERATION_UNSUCCESSFUL());
    }
    return entities;
  }
}
