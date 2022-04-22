import m from "../html/Mithril.ts";
import Button from "./Button.ts";
import Component from "./Component.ts";
import Span from "./Span.ts";
import Slider from "./Slider.ts";
import M from "./M.ts";

export type Data = {
	count: number;
	min: number;
	max: number;
};

export default class Counter extends Component<Data>() {
	oninit() {
	}

	fixData() {
		if (!this.data || Object.keys(this.data).length == 0) {
			this.data = {
				min: 0,
				max: 20,
				count: 5,
			};
		}

		if (!this.data.count) this.data.count = 0;
		if (!this.data.min) this.data.min = 0;
		if (!this.data.max) this.data.max = 10;
	}

	increment() {
		this.data.count++;
	}
	decrement() {
		this.data.count--;
	}
	reset() {
		this.data.count = 0;
	}

	setByButton(key: number) {
		// this.data.count = params.target.dataset.count;
		this.data.count = key;
	}

	buildButtons(count: number) {
		const result = [];
		for (let i = 1; i <= this.data.max; i++) {
			const btnType = i <= count ? Button.type.Primary : Button.type.Secondary;
			// result.push(
			// 	m(`button.btn ${btnType} .m-1`, {
			// 		type: "button",
			// 		onclick: setByButton,
			// 		// key: i,
			// 		"data-count": i,
			// 	}, i),
			// );

			result.push(Button.m({ type: btnType, key: i, text: i.toString(), onclick: () => this.setByButton(i) }));
		}
		return m("", result);
	}

	render(vnode: any) {
		// const redCtr = Slider.m(
		// 	M({ min: this.data.min, max: this.data.max, value: this.data.count }).linkModels("value", this.data, "count"),
		// );

		// const redCtr = Slider.m(
		// 	{
		// 		min: this.data.min,
		// 		max: this.data.max,
		// 		value: this.data.count,
		// 		onChange: (val) => {
		// 			this.data.count = val;
		// 		},
		// 	},
		// 	(model, key, value) => {
		// 		// if (key == "value") this.data.count = value;
		// 	},
		// );

		// redCtr.linkModels("value", this, "count");

		// const redCtr = Slider.m(
		// 	{ min: this.data.min, max: this.data.max, value: this.data.count },
		// ).linkModels("value",this,"count");
		// const data = redCtr.;

		return [
			m("", "Counter component:"),
			m(".input-group .mb-3", [
				m("input.counter", {
					value: this.data.count,
					// value: count,
					class: "form-control",
					placeholder: "Number",
					oninput: (e: Event) => {
						this.data.count = parseInt((e.target as HTMLInputElement).value);
					},
				}),
				m(".input-group-append", [
					Button.m({ type: Button.type.Success, onclick: () => this.increment(), text: "+" }),
					Button.m({ type: Button.type.Warning, onclick: () => this.decrement(), text: "-" }),
					Button.m({ type: Button.type.Danger, onclick: () => this.reset(), text: "0" }),
				]),
			]),
			this.buildButtons(this.data.count),
			m("div", this.data.count.toString()),
			// Span.m({ text: this.data.count.toString(), css: "text-danger" }),
			Slider.m(
				{
					min: this.data.min,
					max: this.data.max,
					value: this.data.count,
					onChange: (val) => {
						this.data.count = val;
					},
				},
			),
		];
	}
}
