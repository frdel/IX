import m from "./html/Mithril.ts";
import Page from "./com/Page.ts";
import Login from "./com/Login.ts";

// const Page = await import("./com/Page.ts");
// const Login = await import("./com/Login.ts");

// const routes = await import("./route/bundle.ts");

// m.mount(document.body, Page);

// m.route(document.body, "/home", {
//     "/home": Page,
//     // "/login": Login,
// })

m.route(document.body, "/home", {
	"/home": Page,
	"/login": Login,
});
