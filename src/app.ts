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
    this.app.use(this.requestTimeLogger);
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
  private requestTimeLogger = () => (req, res, next) => {
    const startTime = Date.now(); // Capture the start time
    
    next(); // Continue to the next middleware or route
  
    res.on('finish', () => {
      const endTime = Date.now(); // Capture the end time
      const duration = endTime - startTime; // Calculate the duration
      console.log(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${duration}ms`);
    });
  };
}
