import express from 'express';
import routes from './routes';
import cors from 'cors';
import mongosse from 'mongoose';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    mongosse.connect(
      'mongodb+srv://db_luan:' +
        process.env.MONGO_PASSWORD +
        '@quizapp.bxhuz.mongodb.net/<dbname>?retryWrites=true&w=majority',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      }
    );
  }
  middlewares() {
    this.server.use(cors());
    this.server.use(express.json());
  }
  routes() {
    this.server.use(routes);
  }
}

export default new App().server;
