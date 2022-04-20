import * as lib from "./lib.ts";

export async function startServer() {
  //initialize Oak app and router objects
  const app = new lib.Oak.Application();
  const router = new lib.Oak.Router();

  //set route handling functions for files and APIs
  lib.FileHandlers.setHandlers(router);
  lib.ApiHandlers.setHandlers(router);

  //set routes to app object
  app.use(router.routes());

  //todo https

  //start http server
  //todo add to config
  await app.listen({ port: 8000 });
}
