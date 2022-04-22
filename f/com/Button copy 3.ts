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
// Button.m = function (data?: Data) {
// 	return m(Button, { _data: data });
// };

//types
// Button.type = Type;

export default {
	//envelope
	m: function (data?: Data) {
		return m(this, { _data: data });
	},

	//passed data
	// let d: Data = vnode.attrs._data || {};
	// d: Data = {},
	d: <Data> {},
	type: Type,

	//default data
	// if (!this.d.css) this.d.css = "";
	// if (!this.d.href) this.d.href = "#";
	// if (!this.d.key) this.d.key = "";
	// if (!this.d.text) this.d.text = "";
	// if (!this.d.type) this.d.type = Type.None;

	oninit(vnode: any) {
		this.d = vnode.attrs._data;

		//default data
		if (!this.d.css) this.d.css = "";
		if (!this.d.href) this.d.href = "#";
		if (!this.d.key) this.d.key = "";
		if (!this.d.text) this.d.text = "";
		if (!this.d.type) this.d.type = Type.None;
	},

	//click handler
	onclick: function (e: Event) {
		if (typeof this.d.onclick == "function") {
			// const key = (<any> e.target).dataset?.key;
			this.d.onclick(this.d.key, e);
		}
	},

	//render
	view: function () {
		return m(`button.btn`, {
			class: `${this.d.type} ${this.d.css}`,
			type: "button",
			onclick: onclick,
			// key: this.d.key,
			"data-key": this.d.key,
		}, this.d.text);
	},
};
