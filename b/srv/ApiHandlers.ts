import * as lib from "./lib.ts";
import Handler from "../api/def/ApiHandler.ts";

export function setHandlers(router: lib.Oak.Router) {
	router.post("/(.+)", async function (ctx) {
		//fetch handler
		const file = `../api/imp${ctx.request.url.pathname}`;
		const api = (await import(file)).default;

		//request data
		const input = await ctx.request.body().value;

		//process
		const responseJSON = await new api().process(input);

		//return
		ctx.response.type = "application/json";
		ctx.response.body = responseJSON;
	});
}
