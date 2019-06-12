const Koa = require('koa');
const server = new Koa();
const Router = require('koa-router');
// const createApp = require('./app')
const serve = require('koa-static');
const path = require('path');
const fs = require('fs');
const { createBundleRenderer } = require('vue-server-renderer');
const backendApp = new Koa();
const frontendApp = new Koa();
const backendRouter = new Router();
const frontendRouter = new Router();


// const bundle = fs.readFileSync(path.resolve(__dirname, '../dist/server.bundle.js'), 'utf-8');
// const renderer = require('vue-server-renderer').createBundleRenderer(bundle, {
//   template: fs.readFileSync(path.resolve(__dirname, '../dist/index.ssr.html'), 'utf-8')
// });
const serverBundle = require(path.resolve(__dirname, './dist/vue-ssr-server-bundle.json'));
const clientManifest = require(path.resolve(__dirname, './dist/vue-ssr-client-manifest.json'));
const template = fs.readFileSync(path.resolve(__dirname, './src/index.ssr.html'), 'utf-8');

const renderer = createBundleRenderer(serverBundle, {
  runInNewContext: false,
  template: template,
  clientManifest: clientManifest
});

server.use(serve(path.resolve(__dirname, './dist')));

// server.use(async ctx => {
//   ctx.body = 'Hello World';
// });


// const Vue = require('vue')
// const renderer = require('vue-server-renderer').createRenderer()
// backendRouter.get('/index', async (ctx, next) => {
//   let html = await renderer.renderToString()
//   ctx.body = html

// })

// server
//   .use(backendRouter.routes())
//   .use(backendRouter.allowedMethods());
server.use(async (ctx, next) => {
  // const app = createApp(ctx)
  // let ctx = {}
  let context = {
    url: ctx.url
  };

  const ssrStream = renderer.renderToStream(context);
  ctx.status = 200;
  ctx.type = 'html';
  ctx.body = ssrStream;
  // ((err, html) => {
  //   if (err) {
  //       ctx.status = 500
  //       ctx.body = 'Internal Server Error'
  //     return
  //   }
  //   console.log(html)

  //   ctx.body= 'dfdfdffd'
  // })
})
server.listen(3030,() => console.log('[Server] starting at port 3030'))