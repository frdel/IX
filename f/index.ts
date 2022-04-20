// r/mod.ts

import * as incl from "./test/incl.js";
import * as incl2 from "./test/incl2.ts";

import { Input, Output, Test1 } from "./api/imp/Test1Api.ts";

import m from "./html/Mithril.js";

console.log(m);

console.log(incl.default.echo());
console.log(incl2.default.echo("| added"));

import Page from "./com/Page.ts";

m.mount(document.body, Page);
