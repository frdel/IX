import m from "../html/Mithril.ts";
import NavItem from "./NavItem.ts";

//envelope
Sidebar.m = () => m(Sidebar, {});

export default function Sidebar() {
	return {
		view: () => [
			m(
				"nav.col-md-3.col-lg-2.d-md-block.bg-light.sidebar.collapse[id='sidebarMenu']",
				m("div.position-sticky.pt-3", [
					m("ul.nav.flex-column", [
						NavItem.m({ text: "Page", href: "#!/" }),
						NavItem.m({ text: "Login", href: "#!/login" }),
					]),
					m(
						"h6.sidebar-heading.d-flex.justify-content-between.align-items-center.px-3.mt-4.mb-1.text-muted",
						[
							m("span", "Saved reports"),
							m(
								"a.link-secondary[href='#'][aria-label='Add a new report']",
								m("span[data-feather='plus-circle']"),
							),
						],
					),
					m("ul.nav.flex-column.mb-2", [
						m(
							"li.nav-item",
							m("a.nav-link[href='#']", [
								m("span[data-feather='file-text']"),
								" Current month ",
							]),
						),
						m(
							"li.nav-item",
							m("a.nav-link[href='#']", [
								m("span[data-feather='file-text']"),
								" Last quarter ",
							]),
						),
						m(
							"li.nav-item",
							m("a.nav-link[href='#']", [
								m("span[data-feather='file-text']"),
								" Social engagement ",
							]),
						),
						m(
							"li.nav-item",
							m("a.nav-link[href='#']", [
								m("span[data-feather='file-text']"),
								" Year-end sale ",
							]),
						),
					]),
				]),
			),
		],
	};
}
