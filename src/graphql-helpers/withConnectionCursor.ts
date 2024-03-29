import { Model } from 'mongoose';
import { connectionFromMongoCursor } from '@entria/graphql-mongoose-loader';

import { LoaderFn } from './types';

export const withConnectionCursor =
  <Context extends object>(
    model: Model<any>,
    loader: LoaderFn<Context>,
    condFn: (...p: any[]) => { conditions?: object; sort?: object }
  ) =>
  (...params: any[]) => {
    const { conditions = {}, sort = {} } = condFn(...params);

    const [context, args] = params;

    const cursor = model.find(conditions).sort(sort);

    return connectionFromMongoCursor({
      cursor,
      context,
      args,
      loader: loader as any,
    });
  };
