import m from "../html/Mithril.ts";
import Component from "./Component.ts";
import NavBarItem from "./NavBarItem.ts";

type Data = {
	title?: string;
	cmd?: string;
};

export default class CopyMe extends Component<Data, Data>() {
	fixData() {
		//default data
		if (!this.data.title) this.data.title = "";
		if (!this.data.cmd) this.data.cmd = "";
	}

	//render
	render(vnode: any) {
		return [
			m(
				"header.navbar.navbar-dark.sticky-top.bg-dark.flex-md-nowrap.p-0.shadow",
				[
					m(
						"a.navbar-brand.col-md-3.col-lg-2.me-0.px-3[href='#']",
						this.data.title || "IX",
					),
					m(
						"button.navbar-toggler.position-absolute.d-md-none.collapsed[type='button'][data-bs-toggle='collapse'][data-bs-target='#sidebarMenu'][aria-controls='sidebarMenu'][aria-expanded='false'][aria-label='Toggle navigation']",
						m("span.navbar-toggler-icon"),
					),
					m(
						"form.w-100",
						{
							onsubmit: (e: Event) => {
								e.preventDefault();
								alert(this.data.cmd);
							},
						},
						m(
							"input.form-control.form-control-dark.w-100[type='text'][aria-label='Command']",
							{
								placeholder: "Command",
								value: this.data.cmd,
								onchange: (e: Event) => {
									this.data.cmd = (e.target as HTMLInputElement).value;
								},
							},
						),
					),

					NavBarItem.m({
						text: "",
						linkCSS: "bi-arrow-left-square",
						href: "#",
					}),
					NavBarItem.m({ text: "Exit", href: "#" }),
				],
			),
		];
	}
}
