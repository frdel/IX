import * as server from "./b/srv/Http.ts";
import * as path from "https://deno.land/std@0.135.0/path/mod.ts";

//todo add to config
//wait 2s for debugger to be ready
console.log("Waiting 2s for debugger...");
await new Promise((resolve) => setTimeout(resolve, 2 * 1000));

//set working directory to initial file
const __dirname = path.dirname(path.fromFileUrl(import.meta.url || ""));
console.log(`Setting work directory to ${__dirname}`);
Deno.chdir(__dirname);

//run http server
console.log("Starting server");
await server.startServer();