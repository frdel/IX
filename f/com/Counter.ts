import m from "../html/Mithril.ts";

export type Model = {
  count: number;
  min: number;
  max: number;
};

//envelope
Counter.create = (model?: Model) => m(Counter, { model });

export default function Counter(this: any, node: any) {
  //passed model
  let d: Model = node.attrs.model;

  //default model
  if (!d) {
    d = {
      min: 0,
      max: 20,
      count: 5,
    };
  }

  function increment() {
    d.count++;
  }
  function decrement() {
    d.count--;
  }
  function reset() {
    d.count = 0;
  }

  function setByButton(params: any) {
    d.count = params.target.dataset.count;
  }

  function buildButtons(count: number) {
    const result = [];
    for (let i = 1; i <= d.max; i++) {
      const style = i <= count ? ".btn-primary" : ".btn-secondary";
      result.push(
        m(`button.btn ${style} .m-1`, {
          type: "button",
          onclick: setByButton,
          key: i,
          "data-count": i,
        }, i),
      );
    }
    return m("", result);
  }

  return {
    view: () => [
      m("", "Counter component:"),
      m(".input-group .mb-3", [
        m("input.counter", {
          value: d.count,
          // value: count,
          class: "form-control",
          placeholder: "Number",
          oninput: (e: Event) => {
            d.count = parseInt((e.target as HTMLInputElement).value);
          },
        }),
        m(".input-group-append", [
          m("button.btn .btn-outline-secondary", {
            type: "button",
            onclick: increment,
          }, "+"),
          m("button.btn .btn-outline-secondary", {
            type: "button",
            onclick: decrement,
          }, "-"),
          m("button.btn .btn-outline-secondary", {
            type: "button",
            onclick: reset,
          }, "Reset"),
        ]),
        buildButtons(d.count),
      ]),
    ],
  };
}
