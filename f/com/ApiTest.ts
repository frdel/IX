import Component from "./Component.ts";
import Button from "./Button.ts";
import Toolbar from "./Toolbar.ts";
import Span from "./Span.ts";
import m from "../html/Mithril.ts";

import Api from "../api/imp/Test1.ts";
import Api2 from "../api/imp/Test2.ts";

export default class ApiTest extends Component<unknown, unknown>() {
	//render
	render(vnode: any) {
		return [
			Toolbar.m({ title: "Api test" }),

			Span.m({ text: "Api test page" }),

			m("div", [
				Button.m({
					text: "Api",
					type: Button.type.Success,
					onclick: async () => {

						const apiData = await Api.call({ var1: "v1", var2: 2 })

						console.log(JSON.stringify(apiData));
					},
				}),

				Button.m({
					text: "Api2",
					type: Button.type.Dark,
					onclick: async () => {
						console.log(JSON.stringify(await Api2.call({ var1: "v1", var2: 2 })));

						const res = await Api2.call({ var1: "444", var2: 666 });
						alert(JSON.stringify(res));
					},
				}),
			]),
		];
	}
}
