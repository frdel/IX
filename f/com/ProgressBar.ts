import m from "../html/Mithril.ts";
import Component from "./Component.ts";

type Data = {
	text?: string;
	ratio: number;
	css?: string;
};

export default class CopyMe extends Component<Data, Data>() {
	fixData() {
		//default data
		if (!this.data.css) this.data.css = "";
		if (!this.data.text) this.data.text = "";
	}

	defaultText() {
		return Math.round(this.data.ratio * 100) + " %";
	}

	//render
	render(vnode: any) {
		const val = this.data.ratio * 100;

		return m(
			"div.progress",
			m(`.progress-bar.progress-bar-striped.progress-bar-animated[role='progressbar'][aria-valuenow='${val}'][aria-valuemin='0'][aria-valuemax='100']`, {
				"style": { "width": `${val}%` },
				class: this.data.css || "",
			}, this.data.text || this.defaultText()),
		);
	}
}
