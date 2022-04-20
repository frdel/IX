import * as lib from "./lib.ts";

export function setHandlers(router: lib.Oak.Router) {
  router.post("/(.+)", async function (ctx) {
    const file = `./api${ctx.request.url.pathname}.ts`;
    const api = (await import(file)).default;
    const body = await ctx.request.body().value;

    const responseJSON = await new api().processCall(body);

    ctx.response.type = "application/json";
    ctx.response.body = responseJSON;
  });
}
