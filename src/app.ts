import express, { Application } from 'express';
import { json } from 'body-parser';
import { PORT } from './env';
import route from './routes/index';
import { connect, ConnectOptions } from 'mongoose';
import { DATABASE_URL } from './env';
import Logger from './utils/logger';

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
    this.app.use(this.requestTimeLogger);
    this.app.get('/', (req, res) => {
      return res.json({ msg: 'Application is Running' });
    });

    route(this.app);
  }

  private connectMongoDB() {
    connect(`${DATABASE_URL}`, {} as ConnectOptions)
      .then(() => {
        Logger.SUCCESS('Connected to mongoDB....');
      })
      .catch((e) => {
        Logger.ERROR('There was and error to connect to mongodb', e);
      });
  }
  public listen() {
    this.app.listen(this.port, () => {
      Logger.SUCCESS('App listening on the port', this.port);
    });
  }
  private requestTimeLogger(req, res, next) {
    const startTime = Date.now(); // Capture the start time
    next(); // Continue to the next middleware or route
    res.on('finish', () => {
      const endTime = Date.now(); // Capture the end time
      const duration = endTime - startTime; // Calculate the duration
      Logger.WARNING(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} took - ${duration}ms`);
    });
  }
}
