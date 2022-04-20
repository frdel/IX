import * as index from "./b/index.ts";
import * as path from "https://deno.land/std@0.135.0/path/mod.ts";


const __filename = path.fromFileUrl(import.meta.url || "");
// Without trailing slash
const __dirname = path.dirname(path.fromFileUrl(import.meta.url || ""));

Deno.chdir(__dirname);


console.log("starting");

index.default.startServer();
// 