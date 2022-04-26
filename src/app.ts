const koa = require('koa');
const graphqlHTTP = require('koa-graphql');
const Router = require('@koa/router');
const schema = require('./graphql/schema').default;
const root = require('./graphql/root');

const app = new koa();
const router = new Router();

app.on('error', err => {
  console.log('Server error', err);
});

router.get( '/',  async  (ctx) => {
    ctx.body = 'Hello World'
})

router.all('/graphql', graphqlHTTP({
  schema,
  graphiql: true,
  rootValue: root,
}));

app.use(router.routes()).use(router.allowedMethods());

export default app;