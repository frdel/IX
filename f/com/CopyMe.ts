import m from "../html/Mithril.ts";
import Component from "./Component.ts";

type Data = {
	text?: string;
	css?: string;
};

export default class CopyMe extends Component<Data, Data>() {
	fixData() {
		//default data
		if (!this.data.css) this.data.css = "";
		if (!this.data.text) this.data.text = "Text";
	}

	//render
	render(vnode: any) {
		return m(`div`, {
			class: this.data.css,
			"data-key": this.data.text,
		}, this.data.text);
	}
}
