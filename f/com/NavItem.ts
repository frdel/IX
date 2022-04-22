import m from "../html/Mithril.ts";

export type Data = {
	href?: string;
	text?: string;
	navCSS?: string;
	linkCSS?: string;
	spanCSS?: string;
};

//envelope
NavItem.m = (data?: Data) => m(NavItem, { _data: data });

export default function NavItem(vnode: any) {
	//passed model
	let d: Data = vnode.attrs._data;

	//default model
	if (!d) {
		d = {
			href: "#",
			text: "Text",
			navCSS: "",
			linkCSS: "",
			spanCSS: "",
		};
	}

	//render
	return {
		view: () => [
			m(
				"li.nav-item",
				{ class: d.navCSS },
				m(
					"a.nav-link",
					{ href: d.href, class: d.linkCSS },
					m("span[data-feather='shopping-cart']", {
						class: d.spanCSS,
					}, d.text),
				),
			),
		],
	};
}
