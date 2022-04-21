import m from "../html/Mithril.ts";

export type Model = {
  href?: string;
  text?: string;
  css?: string;
  key?: string;
};

//envelope
Button.create = (model?: Model) => m(Button, { model });

export default function Button(this: any, vnode: any) {
  //default data
  let data: Model = vnode.attrs.model || {
    href: "#",
    command: "",
    text: "Text",
    css: "",
    spanCSS: "",
  };

  const handleButton = function (e: Event) {
    alert(e.target?.dataset?.key);
  };

  //render
  return {
    view: () => [
      m(`button.btn ${data.css}`, {
        type: "button",
        onclick: handleButton,
        key: data.key,
        "data-key": data.key,
      }, data.text),
    ],
  };
}
