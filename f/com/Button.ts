import m from "../html/Mithril.ts";
import Component from "./Component.ts";

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

export default class Button extends Component<Data>() {
	static type = Type;

	fixData() {
		//default data
		if (!this.data) this.data = {};

		if (!this.data.css) this.data.css = "";
		if (!this.data.href) this.data.href = "#";
		if (!this.data.key) this.data.key = "";
		if (!this.data.text) this.data.text = "";
		if (!this.data.type) this.data.type = Type.None;
	}

	//click handler
	onclick(e: Event) {
		if (typeof this.data.onclick == "function") {
			// const key = (<any> e.target).dataset?.key;
			this.data.onclick(this.data.key, e);
		}
	}

	//render
	render(vnode: any) {
		return m(`button.btn`, {
			class: `${this.data.type} ${this.data.css}`,
			type: "button",
			onclick: (p: any) => this.onclick(p),
			// key: this.data.key,
			"data-key": this.data.key,
		}, this.data.text);
	}
}
