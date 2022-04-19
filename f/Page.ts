import m from "./lib/Mithril.js";
import { Counter, Model as CounterModel } from "./Counter.ts";

export default function Page() {
  const cd: CounterModel = {
    count: 7,
  };

  return {
    view: () => [
      m("", "Page component:"),
      m("input", {
        value: cd.count,
        class: "form-control",
        placeholder: "Number",
        oninput: (e: Event) => {
          cd.count = parseInt((e.target as HTMLInputElement).value);
        },
      }),
      m(Counter, cd),
    ],
  };
}
