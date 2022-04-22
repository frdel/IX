import m from "../html/Mithril.ts";
import Component from "./Component.ts";

interface OnChange {
	(value: number): any;
}

export type Data = {
	text?: string;
	value?: number;
	min?: number;
	max?: number;
	onChange?: OnChange;
};

export default class Slider extends Component<Data, Data>() {
	fixData() {
	}

	render() {
		return m("div", [
			m(
				"label.form-label[for='customRange1']",
				(this.data.text || "") + " " + (this.data.value || ""),
			),
			m("input.form-range[type='range'][id='customRange1']", {
				value: this.data.value,
				min: this.data.min,
				max: this.data.max,
				oninput: (e: Event) => {
					const val = parseInt((e.target as HTMLInputElement).value);
					if (typeof this.data.onChange == "function" && val != this.data.value) {
						this.data.onChange(val);
					}
					this.data.value = val;
				},
			}),
		]);
	}
}
