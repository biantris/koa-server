const koa = require('koa');
const graphqlHTTP = require('koa-graphql');
const Router = require('@koa/router');
const schema = require('./graphql/schema');
const mongoose = require('mongoose');
const root = require('./graphql/root');

mongoose.connect(`mongodb://localhost/graphql-crud`, {
  useNewUrlParser: true
});

const db = mongoose.connection
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => console.log('Database connected.'));

const app = new koa();
const router = new Router();

app.on('error', err => {
  console.log('Server error', err);
});

router.get('koa-server', '/', (ctx) => {
    ctx.body = 'Hello World'
})

app
    .use(router.routes(
      '/graphql',
    ))
    .use(router.allowedMethods(
      graphqlHTTP({
        schema,
        rootValue: root,
        graphiql: true
      })
    ))

app.listen(9000);
