import m from "../html/Mithril.ts";

export type Model = {
  href?: string;
  text?: string;
  navCSS?: string;
  linkCSS?: string;
  spanCSS?: string;
};

//envelope
NavBarItem.create = (model?: Model) => m(NavBarItem, { model });

export default function NavBarItem(this: any, vnode: any) {
  //default data
  let data: Model = vnode.attrs.model || {
    href: "#",
    text: "Text",
    navCSS: "",
    spanCSS: "",
  };

  //copy from input
  Object.assign(data, vnode.attrs);

  //render
  return {
    view: () => [
      m(
        "div.navbar-nav",
        { class: data.navCSS },
        m(
          "div.nav-item.text-nowrap",
          m("a.nav-link.px-3", {
            href: data.href,
            class: data.linkCSS,
          }, data.text),
        ),
      ),
    ],
  };
}
