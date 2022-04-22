import m from "../html/Mithril.ts";
import Button from "./Button.ts";
export type Data = {
	count: number;
	min: number;
	max: number;
};

//envelope
Counter.m = (data?: Data) => m(Counter, { _data: data });

export default function Counter(vnode: any) {
	//passed data
	let d: Data = vnode.attrs._data;

	//default data
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

	function setByButton(key: number) {
		// d.count = params.target.dataset.count;
		d.count = key;
	}

	function buildButtons(count: number) {
		const result = [];
		for (let i = 1; i <= d.max; i++) {
			const btnType = i <= count ? Button.type.Primary : Button.type.Secondary;
			// result.push(
			// 	m(`button.btn ${btnType} .m-1`, {
			// 		type: "button",
			// 		onclick: setByButton,
			// 		// key: i,
			// 		"data-count": i,
			// 	}, i),
			// );

			result.push(Button.m({ type: btnType, key: i, text: i.toString(), onclick: setByButton }));
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
				m("div", d.count.toString()),
			]),
		],
	};
}
