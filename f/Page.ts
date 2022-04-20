import m from "./lib/Mithril.js";
import { Counter, Model as CounterModel } from "./Counter.ts";

export default function Page() {
  const cd: CounterModel = {
    count: 45,
    min: 0,
    max: 250,
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
      m("input.multi-range", {
        type: "range",
        min: cd.min,
        max: cd.max,
        value: cd.count,
        oninput: (e: Event) => {
          cd.count = parseInt((e.target as HTMLInputElement).value);
          Math.max(cd.min, Math.min(cd.count, cd.max));
        },
      }),
      m(Counter, cd),
    ],
  };
}
