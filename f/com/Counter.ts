import m from "../html/Mithril.ts";
import Button from "./Button.ts";
import Component from "./Component.ts";
import Span from "./Span.ts";
import Slider from "./Slider.ts";

export type Data = {
	count: number;
	min: number;
	max: number;
	text?: string;
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
				text: "",
			};
		}

		if (!this.data.count) this.data.count = 0;
		if (!this.data.min) this.data.min = 0;
		if (!this.data.max) this.data.max = 10;
		if (!this.data.text) this.data.text = "Counter component";
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
		this.data.count = key;
	}

	buildButtons(count: number) {
		const result = [];
		for (let i = 1; i <= this.data.max; i++) {
			const btnType = i <= count ? Button.type.Primary : Button.type.Secondary;
			result.push(Button.m({ type: btnType, key: i, text: i.toString(), onclick: () => this.setByButton(i) }));
		}
		return m("", result);
	}

	render(vnode: any) {
		return m("div.container.mt-5", [
			m("h4", this.data.text),
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

			Span.m({ text: this.data.count.toString(), css: "text-danger" }),
			Slider.m(
				{
					min: this.data.min,
					max: this.data.max,
					value: this.data.count,
					text: "Slider component",
					onChange: (val) => {
						this.data.count = val;
					},
				},
			),
		]);
	}
}
