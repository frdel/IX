import m from "../html/Mithril.ts";

export type Data = {
	text?: string;
	value?: number;
	min?: number;
	max?: number;
};

//envelope
Slider.m = (data?: Data) => m(Slider, { _data: data });

export default function Slider(this: any, vnode: any) {
	//default data
	let d: Data = vnode.attrs._data;

	if (!d) {
		d = {
			min: 0,
			max: 100,
			value: 20,
			text: "",
		};
	}

	//render
	return {
		view: () => [
			m(
				"label.form-label[for='customRange1']",
				(d.text || "") + " " + (d.value || ""),
			),
			m("input.form-range[type='range'][id='customRange1']", {
				value: d.value,
				min: d.min,
				max: d.max,
				oninput: (e: Event) => {
					d.value = parseInt((e.target as HTMLInputElement).value);
				},
			}),
		],
	};
}
