import m from "../html/Mithril.ts";

type Data = {
	type?: Type;
	href?: string;
	text?: string;
	css?: string;
	key?: any;
	onclick?: Handler;
};

enum Type {
	None = "",
	Primary = "btn-primary",
	Secondary = "btn-secondary",
	Success = "btn-success",
	Danger = "btn-danger",
	Warning = "btn-warning",
	Info = "btn-info",
	Light = "btn-light",
	Dark = "btn-dark",
	Link = "btn-link",
}

interface Handler {
	(key: any, event: Event): void;
}

//envelope
Button.m = function (data?: Data) {
	return m(Button, { _data: data });
};

//types
Button.type = Type;

export default function Button(vnode: any) {
	//passed data
	const d: Data = vnode.attrs._data || {};

	//default data
	if (!d.css) d.css = "";
	if (!d.href) d.href = "#";
	if (!d.key) d.key = "";
	if (!d.text) d.text = "";
	if (!d.type) d.type = Type.None;

	//click handler
	const onclick = function (e: Event) {
		if (typeof d.onclick == "function") {
			// const key = (<any> e.target).dataset?.key;
			d.onclick(d.key, e);
		}
	};

	//render
	return {
		view: () => [
			m(`button.btn`, {
				class: `${d.type} ${d.css}`,
				type: "button",
				onclick: onclick,
				// key: d.key,
				"data-key": d.key,
			}, d.text),
		],
	};
}
