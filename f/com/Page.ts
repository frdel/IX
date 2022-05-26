import m from "../html/Mithril.ts";
import Counter from "./Counter.ts";
import Toolbar from "./Toolbar.ts";
import Sidebar from "./Sidebar.ts";
import Button from "./Button.ts";
import Slider from "./Slider.ts";
import FormField from "./FormField.ts";

import Api from "../api/imp/Test1.ts";
import Api2 from "../api/imp/Test2.ts";
// import NavItem from "./NavItem.ts";

export default function Page() {
	//counter shared model
	// const cd = M({
	// 	count: 10,
	// 	min: 0,
	// 	max: 100,
	// });

	// //slider model
	// const sd = M({
	// 	min: cd.min,
	// 	max: cd.max,
	// 	value: cd.count,
	// 	text: "Slider",
	// });

	//link slider and counter models
	// M.linkModels(cd, "count", sd, "value");

	//counter shared model
	const cd = {
		count: 10,
		min: 0,
		max: 25,
		text: "Bound counter1",
	};

	const cd2 = {
		count: 0,
		min: 0,
		max: 15,
		text: "Bound counter2",
	};

	const cd3 = {
		count: 2,
		min: 0,
		max: 15,
		text: "Slave counter",
	};

	let cd4: number;

	//slider model
	const sd = {
		min: cd.min,
		max: cd.max,
		value: cd.count,
		text: "Master slider",
	};

	return {
		view: () => [
			[
				Toolbar.m({ title: "Page1" }),
				m(
					"div.container-fluid",
					m("div.row", [
						Sidebar.m(),

						// m(
						//   "nav.col-md-3.col-lg-2.d-md-block.bg-light.sidebar.collapse[id='sidebarMenu']",
						//   m("div.position-sticky.pt-3", [
						//     m("ul.nav.flex-column", [
						//       NavItem.create({ text: "First navitem", href: "##" }),
						//       NavItem.create({ text: "Second navitem", href: "##" }),
						//       NavItem.create({ text: "Third navitem", href: "##" }),
						//     ]),
						//     m(
						//       "h6.sidebar-heading.d-flex.justify-content-between.align-items-center.px-3.mt-4.mb-1.text-muted",
						//       [
						//         m("span", "Saved reports"),
						//         m(
						//           "a.link-secondary[href='#'][aria-label='Add a new report']",
						//           m("span[data-feather='plus-circle']"),
						//         ),
						//       ],
						//     ),
						//     m("ul.nav.flex-column.mb-2", [
						//       m(
						//         "li.nav-item",
						//         m("a.nav-link[href='#']", [
						//           m("span[data-feather='file-text']"),
						//           " Current month ",
						//         ]),
						//       ),
						//       m(
						//         "li.nav-item",
						//         m("a.nav-link[href='#']", [
						//           m("span[data-feather='file-text']"),
						//           " Last quarter ",
						//         ]),
						//       ),
						//       m(
						//         "li.nav-item",
						//         m("a.nav-link[href='#']", [
						//           m("span[data-feather='file-text']"),
						//           " Social engagement ",
						//         ]),
						//       ),
						//       m(
						//         "li.nav-item",
						//         m("a.nav-link[href='#']", [
						//           m("span[data-feather='file-text']"),
						//           " Year-end sale ",
						//         ]),
						//       ),
						//     ]),
						//   ]),
						// ),
						m(
							"main.col-md-9.ms-sm-auto.col-lg-10.px-md-4",
							m(
								"div.d-flex.justify-content-between.flex-wrap.flex-md-nowrap.align-items-center.pt-3.pb-2.mb-3.border-bottom",
								m("div.grid", [
									// m(Counter),

									FormField.m({
										label: "popis",
										onChange: (val) => {
											console.log(val);
										},
										onSubmit: (val) => {
											alert(val);
										},
									}),

									Slider.m(sd, (model) => {
										cd.count = <number> model.value;
										cd2.count = cd.count;
									}),

									Button.m({
										text: "Api",
										type: Button.type.Success,
										onclick: async () => {
											console.log(JSON.stringify(await Api.call({ var1: "v1", var2: 2 })));
										},
									}),

									Button.m({
										text: "Api2",
										type: Button.type.Dark,
										onclick: async () => {
											console.log(JSON.stringify(await Api2.call({ var1: "v1", var2: 2 })));
											
										const res = await Api2.call({var1:"444",var2:666});
											alert(JSON.stringify(res));
										},
									}),
									// Button.m({ text: "Btn", key: "abc" }),

									m("div.row row-cols-1 row-cols-sm-2 row-cols-md-2 row-cols-lg-2 row-cols-xl-3", [
										m("div.col.mb-3", Counter.m(cd)),
										m("div.col.mb-3", Counter.m(cd2)),

										m("div.col.mb-3", Counter.m(cd3)),
										m(
											"div.col.mb-3",
											Counter.m({ min: 2, text: "Master counter" }, (model) => {
												cd3.count = model.count;
												cd4 = model.count;
											}),
										),

										m("div.col.mb-3", m(Counter)),
										m("div.col.mb-3", Counter.m({ count: 8, min: 0, max: 15, text: "Locked counter" })),
										// Counter.create({ count: 2, min: 0, max: 10 }),
										// Component.crea‹te<Counter>();
									]),
								]),
							),
						),
					]),
				),
			],
		],
	};
}
