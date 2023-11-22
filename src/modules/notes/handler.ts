import serverless from 'serverless-http';
import app from '../../app';
import router from './notes.routes';
import { NextFunction, Request, Response } from 'express';

app.use('/notes', router);

app.use((_, res) => {
  res.status(404).send();
});

app.use((err: Error, req: Request, res: Response, __: NextFunction) => {
  const toReturn: { message: string; error?: string } = {
    message: 'Internal server error',
  };
  const { body, params, query } = req;

  console.error(err, { body, params, query }); // It's important to use a logger system.

  if (process.env.NODE_ENV === 'production') {
    toReturn.error = err.message;
  }

  res.status(500).json(toReturn);
});

export const handler = serverless(app);
