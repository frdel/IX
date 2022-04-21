import m from "../html/Mithril.ts";
import M from "./M.ts";

export type Data = {
  text?: string;
  value?: number;
  min?: number;
  max?: number;
};

//envelope
Slider.create = (model?: Data) => m(Slider, { model });

export default function Slider(this: any, vnode: any) {
  //default data
  let data: Data = vnode.attrs.model ||
    {
      min: 0,
      max: 100,
      value: 20,
      text: "",
    };

  //render
  return {
    view: () => [
      m(
        "label.form-label[for='customRange1']",
        (data.text || "") + " " + (data.value || ""),
      ),
      m("input.form-range[type='range'][id='customRange1']", {
        value: data.value,
        min: data.min,
        max: data.max,
        oninput: (e: Event) => {
          data.value = parseInt((e.target as HTMLInputElement).value);
        },
      }),
    ],
  };
}
