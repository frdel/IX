import m from "../html/Mithril.ts";
import NavBarItem from "./NavBarItem.ts";

export default function Toolbar() {
  const handleCommand = function (e: Event) {
    e.preventDefault();

    console.log(cmd);

    // const i = parseInt(cmd);
    // if (!isNaN(i)) alert(i);
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

          // m(
          //   "div.navbar-nav",
          //   m(
          //     "div.nav-item.text-nowrap",
          //     m("a.nav-link.px-3[href='#']", "Sign out"),
          //   ),
          // ),

          NavBarItem.create({ text: "", linkCSS: "bi-arrow-left-square", href: "#" }),
          NavBarItem.create({ text: "Exit", href: "#" }),
          // m(
          //   "div.navbar-nav",
          //   m(
          //     "div.nav-item.text-nowrap",
          //     m("a.nav-link.px-3[href='#']", "Sign out"),
          //   ),
          // ),
        ],
      ),
    ],
  };
}
