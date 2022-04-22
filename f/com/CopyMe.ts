import m from "../html/Mithril.ts";

//data type of this component
export type Data = {
	text?: string;
	css?: string;
};

//envelope
CopyMe.m = (data?: Data) => m(CopyMe, { _data: data });

export default function CopyMe(this: any, vnode: any) {
	//passed data
	let d: Data = vnode.attrs._data;

	//default data
	if (!d) {
		d = {
			text: "Text",
			css: "",
		};
	}

	//rendering function
	function render(): Array<any> {
		return [
			m("span", {
				class: d.css,
			}, d.text),
		];
	}

	//return rendering function
	return {
		view: render,
	};
}
