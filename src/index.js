const Koa = require('Koa');
const Router = require('koa-router');

const api = require('./api');

const app = new Koa();
const router = new Router();

router.use('/api', api.routes());

app.use(router.routes()).use(router.allowedMethods());

app.listen(4000, () => {
    console.log('listening to port 4000');
});