import cors from '@koa/cors';
import Router from '@koa/router';
import Koa from 'koa';
import bodyParser from 'koa-bodyparser';

import { schema } from './schema/schema';

import {
  getGraphQLParameters,
  processRequest,
  renderGraphiQL,
  sendResult,
  shouldRenderGraphiQL,
} from 'graphql-helix';

import koaPlayground from 'graphql-playground-middleware-koa';

import { getContext } from './context';

const app = new Koa();
const router = new Router();

app.use(bodyParser());

app.on('error', (err) => {
  console.log('app error: ', err);
});

app.use(cors());

router.get('/', async (ctx) => {
  ctx.body = 'Welcome koa server (~˘▾˘)~';
});

router.all(
  '/playground',
  koaPlayground({
    endpoint: '/graphql',
  })
);

router.all('/graphql', async (ctx) => {
  //const { user } = await getUser(ctx.header.authorization); soon :)
  const request = {
    body: ctx.request.body,
    headers: ctx.req.headers,
    method: ctx.request.method,
    query: ctx.request.query,
  };

  if (shouldRenderGraphiQL(request)) {
    ctx.body = renderGraphiQL({});
  } else {
    const { operationName, query, variables } = getGraphQLParameters(request);

    const result = await processRequest({
      operationName,
      query,
      variables,
      request,
      schema,
      contextFactory: () => {
        return getContext({
          req: request,
        });
      },
    });

    ctx.respond = false;
    sendResult(result, ctx.res);
  }
});

app.use(router.routes()).use(router.allowedMethods());

export default app;
