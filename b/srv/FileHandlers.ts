import * as lib from "./lib.ts";
import * as Emit from "https://deno.land/x/emit/mod.ts";

export function setHandlers(router: lib.Oak.Router) {
	const feFolder = lib.Path.resolve("./f");

	//exit Deno on /restart, docker container will then reset and download latest version from github
	//todo disable in production
	router.get(`/restart`, function () {
		Deno.exit();
	});

	//landing page, get index HTML file
	router.get(`/`, async function (ctx) {
		const index = await fetchIndex();
		ctx.response.body = index.code;
		ctx.response.type = index.mime;
	});

	router.get(`/html/bundle.css`, async function (ctx) {
		const css = await fetchCSSBundle();
		ctx.response.type = "text/css";
		ctx.response.body = css;
	});

	//javascript and typescript files, here we do transpiling, bundling and caching
	//todo merge path-to-regex into one
	router.get(`/(.+)(\.js$)`, async function (ctx) {
		return await handleScript(ctx);
	});
	router.get(`/(.+)(\.ts$)`, async function (ctx) {
		return await handleScript(ctx);
	});

	//handle JS or TS request
	async function handleScript(ctx: any) {
		ctx.response.body = await fetchScript(ctx.request.url.pathname);
		ctx.response.type = `application/javascript`;
	}

	//other files, return text content and mime type by extension
	router.get("/(.+)", async function (ctx) {
		// const file = filePath(ctx.request.url.pathname);
		// const ext = lib.Path.extname(file) || `.txt`;
		// ctx.response.type = lib.Lookup(ext);
		// ctx.response.body = await Deno.readTextFile(file);
		await ctx.send({
			root: feFolder.toString(),
			index: ctx.request.url.pathname,
		});
	});

	//return index html with JS initializer injected
	async function fetchIndex() {
		//landing page file paths
		const htmlFile = filePath("html/index.html");
		const jsFile = "index.ts";
		const bsFile = filePath("html/bootstrap.bundle.min.js");

		//load index html and js files
		const html = Deno.readTextFile(htmlFile);
		const js = fetchScript(jsFile);
		const bs = Deno.readTextFile(bsFile);
		const css = fetchCSSBundle();

		//inject js initializer into html
		const parts = (await html).split("<!--IX_PRELOAD-->");
		const code = parts[0] +
			`\n<script type="module">` +
			await js +
			`\n</script>` +
			`\n<script>` +
			await bs +
			`\n</script>` +
			`\n<style>` +
			await css +
			`\n</style>` +
			parts[1]; //string replace not safe

		// const code = await html;

		//return resulting code and mime
		const mime = "text/html";
		return { mime, code };
	}

	//bundle all CSS files in /html together
	async function fetchCSSBundle() {
		//todo caching
		const folder = filePath("html/");
		const files = Deno.readDir(folder);
		const promises: Promise<string>[] = [];
		let result = "";
		for await (const file of files) {
			if (file.isFile && lib.Path.extname(file.name) == ".css") {
				promises.push(Deno.readTextFile(filePath("html/" + file.name)));
			}
		}
		const cssFiles = await Promise.all(promises);
		for (const css of cssFiles) {
			result += "\n" + css;
		}

		return result;
	}

	//bundle all route files in /route together
	async function fetchRouteBundle() {
		//todo caching
		const folder = filePath("route/");
		const files = Deno.readDir(folder);
		const promises: Promise<string>[] = [];
		let result = [];
		for await (const file of files) {
			if (file.isFile && lib.Path.extname(file.name) == ".json") {
				promises.push(Deno.readTextFile(filePath("route/" + file.name)));
			}
		}
		const routeFiles = await Promise.all(promises);
		for (const route of routeFiles) {
			result.push(JSON.parse(route));
		}

		const script = `export default ${JSON.stringify(result)}`;
		return script;
	}

	//todo caching and bundling
	const scriptCache = new Map<string, string>();
	const dev = Deno.args.indexOf("--ix-dev") >= 0;
	const caching = !dev;
	const maps = dev;

	async function fetchScript(path: string): Promise<string> {
		if (caching && scriptCache.has(path)) return scriptCache.get(path) || "";

		const file = filePath(path);
		const url = fileUrl(file);

		// if (true) {
		const bnd = await Emit.bundle(url, {
			allowRemote: true,
			cacheSetting: caching ?  "use" : "reloadAll",
			compilerOptions: {
				sourceMap: maps,
				// checkJs: false,
				// inlineSourceMap: false,
				// inlineSources: false,
			},
		});

		if (caching) scriptCache.set(path, bnd.code);

		return bnd.code;
		// } else {
		// 	const scripts = await Emit.emit(url, {
		// 		allowRemote: true,
		// 		// cacheSetting: "reloadAll",
		// 	});

		// 	if (caching) {
		// 		for (const href in scripts) {
		// 			scriptCache.set(href, (<Record<string, string>> scripts)[href]);
		// 		}
		// 	}

		// 	return (<Record<string, string>> scripts)[urlHref];
		// }
	}

	//normalize file path to point into frontend directory
	function filePath(path: string): string {
		let fullPath = lib.Path.join(feFolder, path);
		if (lib.Path.SEP == "\\") fullPath = toUnixPath(fullPath);
		return fullPath;
	}

	function fileUrl(path: string): URL {
		return new URL(path, "file://");
	}

	function toUnixPath(path: string): string {
		return path.replace(/[\\/]+/g, "/").replace(/^([a-zA-Z]+:|\.\/)/, "");
	}
}
