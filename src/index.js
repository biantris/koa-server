// hello world koa

const Koa = require('koa');
const Router = require('@koa/router');

const app = new Koa();
const router = new Router();

router.get('koa-server', '/', (ctx) => {
    ctx.body = 'Hello World'
})

app
    .use(router.routes())
    .use(router.allowedMethods())

app.listen(8080);
