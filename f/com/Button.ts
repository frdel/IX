import m from "../html/Mithril.ts";

export type Data = {
	href?: string;
	text?: string;
	css?: string;
	key?: string;
};

//envelope
Button.m = (data?: Data) => m(Button, { _data: data });

export default function Button(vnode: any) {
	//passed data
	let d: Data = vnode.attrs._data;

	//default data
	if (!d) {
		d = {
			href: "#",
			text: "Button",
		};
	}

	const handleButton = function (e: Event) {
		alert((<any> e.target).dataset?.key);
	};

	//render
	return {
		view: () => [
			m(`button.btn ${d.css}`, {
				type: "button",
				onclick: handleButton,
				key: d.key,
				"data-key": d.key,
			}, d.text),
		],
	};
}
