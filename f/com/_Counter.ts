import m from "../html/Mithril.ts";
import Component from "./_Component.ts";

export type Model = {
  count: number;
  min: number;
  max: number;
};
export default class Counter extends Component<Model> {
  
  defaultModel() {
    return {
      count: 9,
      min: 0,
      max: 50,
    };
  }

  render() {
    return {
      view: () => [
        m("", "Counter component:"),
        m(".input-group .mb-3", [
          m("input.counter", {
            value: this.model.count,
            // value: count,
            class: "form-control",
            placeholder: "Number",
            onchange: (e: Event) => {
              this.model.count = parseInt((e.target as HTMLInputElement).value);
            },
          }),
          m(".input-group-append", [
            m("button.btn .btn-outline-secondary", {
              type: "button",
              onclick: this.increment.bind(this),
            }, "+"),
            m("button.btn .btn-outline-secondary", {
              type: "button",
              onclick: this.decrement.bind(this),
            }, "-"),
            m("button.btn .btn-outline-secondary", {
              type: "button",
              onclick: this.reset.bind(this),
            }, "Reset"),
          ]),
          this.buildButtons(this.model.count),
        ]),
      ],
    };
  }

  increment() {
    this.model.count++;
  }
  decrement() {
    this.model.count--;
  }
  reset() {
    this.model.count = 0;
  }

  setByButton(params: any) {
    this.model.count = params.target.dataset.count;
  }

  buildButtons(count: number) {
    const result = [];
    for (let i = 1; i <= this.model.max; i++) {
      const style = i <= count ? ".btn-primary" : ".btn-secondary";
      result.push(
        m(`button.btn ${style} .m-1`, {
          type: "button",
          onclick: this.setByButton.bind(this),
          key: i,
          "data-count": i,
        }, i),
      );
    }
    return m("", result);
  }
}

// export function Counter(node: any) {
//   // const d: Model = {
//   //   count: 8,
//   // };

//   const d: Model = node.attrs || { count: 0 };
//   // let count = 6;

//   function increment() {
//     d.count++;
//     // count++;
//   }
//   function decrement() {
//     d.count--;
//     // count--;
//   }
//   function reset() {
//     d.count = 0;
//     // count = 0;
//   }

//   function setByButton(params: any) {
//     d.count = params.target.dataset.count;
//   }

//   function buildButtons(count: number) {
//     const result = [];
//     for (let i = 1; i <= d.max; i++) {
//       const style = i <= count ? ".btn-primary" : ".btn-secondary";
//       result.push(
//         m(`button.btn ${style} .m-1`, {
//           type: "button",
//           onclick: setByButton,
//           key: i,
//           "data-count": i,
//         }, i),
//       );
//     }
//     return m("", result);
//   }

//   return {
//     view: () => [
//       m("", "Counter component:"),
//       m(".input-group .mb-3", [
//         m("input.counter", {
//           value: d.count,
//           // value: count,
//           class: "form-control",
//           placeholder: "Number",
//           onchange: (e: Event) => {
//             d.count = parseInt((e.target as HTMLInputElement).value);
//           },
//         }),
//         m(".input-group-append", [
//           m("button.btn .btn-outline-secondary", {
//             type: "button",
//             onclick: increment,
//           }, "+"),
//           m("button.btn .btn-outline-secondary", {
//             type: "button",
//             onclick: decrement,
//           }, "-"),
//           m("button.btn .btn-outline-secondary", {
//             type: "button",
//             onclick: reset,
//           }, "Reset"),
//         ]),
//         buildButtons(d.count),
//       ]),
//     ],
//   };
// }
