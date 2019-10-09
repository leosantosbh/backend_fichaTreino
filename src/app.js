import 'dotenv/config';

import express from 'express';
import path from 'path';
import Youch from 'youch';
import cors from 'cors';
import 'express-async-errors';
import routes from './routes';

import './database';

class App {
  constructor() {
    this.server = express();
    this.middlewares();
    this.routes();
    this.exceptionHandler();
  }

  middlewares() {
    const dir_image = express.static(
      path.resolve(__dirname, '..', 'temp', 'uploads')
    );
    this.server.use(cors());
    this.server.use(express.json());
    this.server.use('/avatarexercicios', dir_image);
    this.server.use('/avatars', dir_image);
  }

  routes() {
    this.server.use(routes);
  }

  exceptionHandler() {
    this.server.use(async (err, req, res, next) => {
      if (process.env.NODE_ENV === 'development') {
        const errors = await new Youch(err, req).toJSON();

        return res.status(500).json(errors);
      }

      return res.status(500).json({ error: 'Internal server error' });
    });
  }
}

export default new App().server;
