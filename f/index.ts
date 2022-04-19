// r/mod.ts

import * as incl from "./incl.js";
import * as incl2 from "./rin/incl2.ts";
//import * as incl3 from "../b/incl2.ts";
import { Input, Output, Test1 } from "./api/Test1Api.ts";

import m from "./lib/Mithril.js";

console.log(m);

console.log(incl.default.echo());
console.log(incl2.default.echo("| added"));
//console.log(incl3.default());

// window.apiTest1 = async function () {
//   const inp: Input = {
//     var1: "this in",
//     var2: 6,
//   };
//   const out = await Test1.prototype.callApi(inp);
//   console.log(out);
// };

import Page from "./Page.ts";

m.mount(document.body, Page);
