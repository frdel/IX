import m from "../html/Mithril.ts";
import Counter from "./Counter.ts";
import Toolbar from "./Toolbar.ts";
import Sidebar from "./Sidebar.ts";
import Button from "./Button.ts";
import Slider from "./Slider.ts";
import M from "./M.ts";
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
		max: 100,
	};

	const cd2 = {
		count: 10,
		min: 0,
		max: 100,
	};

	//slider model
	const sd = {
		min: cd.min,
		max: cd.max,
		value: cd.count,
		text: "Slider",
	};

	//link slider and counter models
	M.linkModels(cd, "count", sd, "value");

	return {
		view: () => [
			[
				m(Toolbar),
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
								m("", [
									// m(Counter),

									Slider.m(sd),
									// Button.m({ text: "Btn", key: "abc" }),
									Counter.m(),
									Counter.m(cd),
									Counter.m(cd2),

									Counter.m(),
									m(Counter),
									Counter.m({ count: 8, min: 0, max: 15 }),
									// Counter.create({ count: 2, min: 0, max: 10 }),
									// Component.crea‹te<Counter>();
								]),
							),
						),
					]),
				),
			],
		],
	};
}
