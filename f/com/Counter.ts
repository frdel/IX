import m from "../html/Mithril.ts";
import Button from "./Button.ts";
import Component from "./Component.ts";
import Span from "./Span.ts";
import Slider from "./Slider.ts";
import ProgressBar from "./ProgressBar.ts";

export type Data = {
	count: number;
	min: number;
	max: number;
	text: string;
};

export type Input = {
	count?: number;
	min?: number;
	max?: number;
	text?: string;
};

export default class Counter extends Component<Data, Input>() {
	oninit() {
	}

	fixData() {
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
			result.push(
				Button.m({ type: btnType, key: i, css: "col m-1", text: i.toString(), onclick: () => this.setByButton(i) }),
			);
		}
		return m(".div.row row-cols-6", result);
	}

	render(vnode: any) {
		return m("div.container.border.p-3", [
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
					Button.m({ type: Button.type.Success, onclick: () => this.increment(), icon: "bi-file-plus" }),
					Button.m({ type: Button.type.Warning, onclick: () => this.decrement(), text: "-" }),
					Button.m({ type: Button.type.Danger, onclick: () => this.reset(), text: "0" }),
				]),
			]),
			this.buildButtons(this.data.count),

			Span.m({ text: this.data.count.toString(), css: "text-danger" }),
			ProgressBar.m({ ratio: (this.data.count - this.data.min) / (this.data.max - this.data.min) }),
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
