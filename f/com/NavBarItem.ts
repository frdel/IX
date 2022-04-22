import m from "../html/Mithril.ts";

export type Model = {
	href?: string;
	text?: string;
	navCSS?: string;
	linkCSS?: string;
	spanCSS?: string;
};

//envelope
NavBarItem.m = (data?: Model) => m(NavBarItem, { _data: data });

export default function NavBarItem(this: any, vnode: any) {
	//passed data
	let d: Model = vnode.attrs._data;
  
	//default data
	if (!d) {
		d = {
			href: "#",
			text: "Text",
			navCSS: "",
			spanCSS: "",
		};
	}

	//render
	return {
		view: () => [
			m(
				"div.navbar-nav",
				{ class: d.navCSS },
				m(
					"div.nav-item.text-nowrap",
					m("a.nav-link.px-3", {
						href: d.href,
						class: d.linkCSS,
					}, d.text),
				),
			),
		],
	};
}
