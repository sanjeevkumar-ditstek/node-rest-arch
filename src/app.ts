import express, { Application } from "express";
import { json } from "body-parser";
import { PORT } from "./env";
import route from "./routes/index";
import { connect, ConnectOptions } from "mongoose";
import { DATABASE_URL } from "./env";

export default class App {
  public app: Application;
  public port: number;

  constructor() {
    this.app = express();
    this.port = PORT;
    this.initializeMiddlewares();
    this.connectMongoDB();
  }

  private initializeMiddlewares() {
    this.app.use(json());
    this.app.get("/", (req, res) => {
      return res.json({ msg: "Application is Running" });
    });
    route(this.app);
  }

  private connectMongoDB() {
    connect(`${DATABASE_URL}`, {} as ConnectOptions)
      .then(() => {
        console.log("Connected to mongoDB....");
      })
      .catch((e) => {
        console.log("There was and error to connect to mongodb");
        console.log(e);
      });
  }
  public listen() {
    this.app.listen(this.port, () => {
      console.log(`App listening on the port ${this.port}`);
    });
  }
}
