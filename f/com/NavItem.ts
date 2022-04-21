import m from "../html/Mithril.ts";

export type Model = {
  href?: string;
  text?: string;
  navCSS?: string;
  linkCSS?: string;
  spanCSS?: string;
};

//envelope
NavItem.create = (model?: Model) => m(NavItem, { model });


export default function NavItem(this: any, vnode: any) {
  //default data
  let data: Model = this.model || {
    href: "#",
    text: "Text",
    navCSS: "",
    linkCSS: "",
    spanCSS: "",
  };

  //copy from input
  Object.assign(data, vnode.attrs);

  //render
  return {
    view: () => [
      m(
        "li.nav-item",
        { class: data.navCSS },
        m(
          "a.nav-link",
          { href: data.href, class: data.linkCSS },
          m("span[data-feather='shopping-cart']", {
            class: data.spanCSS,
          }, data.text),
        ),
      ),
    ],
  };
}
