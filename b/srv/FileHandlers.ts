import * as lib from "./lib.ts";

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
    const file = filePath(ctx.request.url.pathname);
    ctx.response.body = await fetchScript(file);
    ctx.response.type = `application/javascript`;
  }

  //other files, return text content and mime type by extension
  router.get("/(.+)", async function (ctx) {
    const file = filePath(ctx.request.url.pathname);
    const ext = lib.Path.extname(file) || `.txt`;
    ctx.response.type = lib.Lookup(ext);
    ctx.response.body = await Deno.readTextFile(file);
  });

  //return index html with JS initializer injected
  async function fetchIndex() {
    //landing page file paths
    const htmlFile = filePath("html/index.html");
    const jsFile = filePath("index.ts");

    //load index html and js files
    const html = Deno.readTextFile(htmlFile);
    const js = fetchScript(jsFile);

    //inject js initializer into html
    const parts = (await html).split("//S7_PRELOAD");
    const code = parts[0] + await js + parts[1]; //string replace not safe

    //return resulting code and mime
    const mime = "text/html";
    return { mime, code };
  }

  //todo caching and bundling
  const scriptCache = new Map<string, string>();
  const caching = false;
  const bundle = false;

  async function fetchScript(path: string): Promise<string> {
    if (caching && scriptCache.has(path)) return scriptCache.get(path) || "";

    const bun = await Deno.emit(path, {
      bundle: bundle ? "module" : undefined,
      check: false,
      compilerOptions: {
        removeComments: false,
        alwaysStrict: true,
        target: "es2015",
      },
    });

    if (Object.keys(bun.files).length == 0) throw "404";

    if (!bundle) {
      const pos =
        lib.Path.extname(path) == ".ts" || lib.Path.extname(path) == ".jsx"
          ? ".js"
          : "";
      const absPath = ("file://" +
        lib.Path.resolve(path) + pos).replace(/ /g, "%20");
      scriptCache.set(path, bun.files[absPath]);
      return bun.files[absPath];
    } else {
      const bundleFile = bun.files["deno:///bundle.js"];
      const mapFile = bun.files["deno:///bundle.js.map"];
      const rpath = "file://" + lib.Path.resolve("./r/");
      const map = JSON.parse(bun.files["deno:///bundle.js.map"]);

      for (let source of map.sources) {
        const rel2 = lib.Path.relative(rpath, source);

        if (rel2.startsWith("..")) {
          console.log("NOK " + source);
        } else {
          console.log("OK " + source);
        }
      }
      scriptCache.set(path, bundleFile);
      return bundleFile;
    }
  }

  //normalize file path to point into frontend directory
  function filePath(path: string): string {
    return lib.Path.join(feFolder, path);
  }
}
