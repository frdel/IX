// import ApiHandler from "./com/ApiHandler.ts";
// import * as lib from "./lib.ts";

// const startServer = async function () {
//   const app = new lib.oak.Application();
//   const router = new lib.oak.Router();

//   router.get("/restart", async function (ctx) {
//     Deno.exit();
//   });

//   router.get("/(.+)", async function (ctx) {
//     const file = `./f${ctx.request.url.pathname}`;
//     let ext = lib.Path.extname(file);
//     if (ext == ".ts" || ext == ".jsx") ext = ".js";
//     const mime = lib.lookup(ext);

//     let content = "";
//     if (ext == ".js") {
//       content = await fetchScript(file, false);
//     } else {
//       content = await Deno.readTextFile(file);
//     }

//     ctx.response.type = mime;
//     ctx.response.body = content;
//   });

//   router.get("/", async function (ctx) {
//     return await fetchIndex(ctx);
//   });

//   async function fetchIndex(
//     ctx: lib.oak.RouterContext<
//       "/",
//       Record<string | number, string | undefined>,
//       Record<string, any>
//     >,
//   ) {
//     console.log(lib.Path.resolve("./f/index.html"));

//     let html = await Deno.readTextFile("./f/index.html");

//     const bundle = false;
//     const file = `./f/index.ts`;

//     const incl = await fetchScript(file, bundle);
//     // console.log(incl.length);

//     const parts = html.split("//S7_PRELOAD");
//     html = parts[0] + incl + parts[1]; //string replace not safe

//     const mime = "text/html";

//     ctx.response.type = mime;
//     ctx.response.body = html;
//   }

//   const scriptCache = new Map<string, string>();
//   const caching = false;

//   async function fetchScript(path: string, bundle: boolean): Promise<string> {
//     if (caching && scriptCache.has(path)) return scriptCache.get(path) || "";

//     const bun = await Deno.emit(path, {
//       bundle: bundle ? "module" : undefined,
//       check: false,
//       compilerOptions: {
//         removeComments: false,
//         alwaysStrict: true,
//         target: "es2015",
//       },
//     });

//     if (Object.keys(bun.files).length == 0) throw "404";

//     if (!bundle) {
//       const pos =
//         lib.Path.extname(path) == ".ts" || lib.Path.extname(path) == ".jsx"
//           ? ".js"
//           : "";
//       const absPath = ("file://" +
//         lib.Path.resolve(path) + pos).replace(/ /g, "%20");
//       scriptCache.set(path, bun.files[absPath]);
//       return bun.files[absPath];
//     } else {
//       const bundleFile = bun.files["deno:///bundle.js"];
//       const mapFile = bun.files["deno:///bundle.js.map"];
//       const rpath = "file://" + lib.Path.resolve("./r/");
//       const map = JSON.parse(bun.files["deno:///bundle.js.map"]);

//       for (let source of map.sources) {
//         const rel2 = lib.Path.relative(rpath, source);

//         if (rel2.startsWith("..")) {
//           console.log("NOK " + source);
//         } else {
//           console.log("OK " + source);
//         }
//       }
//       scriptCache.set(path, bundleFile);
//       return bundleFile;
//     }
//   }

//   router.post("/(.+)", async function (ctx) {
//     const file = `./api${ctx.request.url.pathname}.ts`;
//     const api = (await import(file)).default;
//     const body = await ctx.request.body().value;

//     const responseJSON = await new api().processCall(body);

//     ctx.response.type = "application/json";
//     ctx.response.body = responseJSON;
//   });

//   app.use(router.routes());
//   await app.listen({ port: 8000 });
// };

// export default { startServer };
