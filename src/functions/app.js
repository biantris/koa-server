import { getDataloaders } from '../graphql/loaderRegister';

import Koa from 'koa';
import GraphQLHTTP from 'koa-graphql';
import Router from 'koa-router';
import cors from '@koa/cors';
import bodyParser from 'koa-bodyparser';

import { schema } from '../schema/schema';

import koaPlayground from 'graphql-playground-middleware-koa';

const app = new Koa();
const router = new Router();

const graphqlSettingsPerReq = async (req, ctx, koaContext) => {
  const { event } = koaContext;
  const dataloaders = getDataloaders();

  return {
    graphiql: true,
    schema,
    context: {
      event,
      req,
      dataloaders,
    },
    formatError: error => {
      console.log(error.message);
      console.log(error.locations);
      console.log(error.stack);

      return {
        message: error.message,
        locations: error.locations,
        stack: error.stack,
      };
    },
  };
};

const graphqlServer = GraphQLHTTP(graphqlSettingsPerReq);

router.get('/.netlify/functions/serverless-http', async ctx => {
  ctx.body = 'Welcome koa server (~˘▾˘)~';
});

router.all('/.netlify/functions/serverless-http/graphql', graphqlServer);

router.all(
  '/.netlify/functions/serverless-http/playground',
  koaPlayground({
    endpoint: '/.netlify/functions/serverless-http/graphql',
  }),
);

app.use(bodyParser());
app.use(cors());
app.use(router.routes()).use(router.allowedMethods());

export default app;
