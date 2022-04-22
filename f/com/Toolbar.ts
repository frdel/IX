import m from "../html/Mithril.ts";
import NavBarItem from "./NavBarItem.ts";

export default function Toolbar() {
	const handleCommand = function (e: Event) {
		e.preventDefault();
		console.log(cmd);
	};

	let cmd = "";

	return {
		view: () => [
			m(
				"header.navbar.navbar-dark.sticky-top.bg-dark.flex-md-nowrap.p-0.shadow",
				[
					m(
						"a.navbar-brand.col-md-3.col-lg-2.me-0.px-3[href='#']",
						"IX",
					),
					m(
						"button.navbar-toggler.position-absolute.d-md-none.collapsed[type='button'][data-bs-toggle='collapse'][data-bs-target='#sidebarMenu'][aria-controls='sidebarMenu'][aria-expanded='false'][aria-label='Toggle navigation']",
						m("span.navbar-toggler-icon"),
					),
					m(
						"form.w-100",
						{ onsubmit: handleCommand },
						m(
							"input.form-control.form-control-dark.w-100[type='text'][aria-label='Command']",
							{
								placeholder: "Command",
								value: cmd,
								onchange: function (e: Event) {
									cmd = (e.target as HTMLInputElement).value;
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
		],
	};
}
