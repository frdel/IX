import m from "../html/Mithril.ts";
import Component from "./Component.ts";

type Data = {
	label?: string;
	value?: string;
	onInput?: Handler;
	onChange?: Handler;
	onSubmit?: Handler;
};

interface Handler {
	(value: string, event: Event): void;
}

export default class CopyMe extends Component<Data, Data>() {
	fixData() {
		//default data
		if (!this.data.label) this.data.label = "";
		if (!this.data.value) this.data.value = "Text";
	}

	//input handler
	onInput(e: Event) {
		this.data.value = (e.target as HTMLInputElement).value;
		if (typeof this.data.onInput == "function") this.data.onInput(this.data.value || "", e);
	}

	//change handler
	onChange(e: Event) {
		if (typeof this.data.onChange == "function") this.data.onChange(this.data.value || "", e);
	}

	//submit handler
	onSubmit(e: Event) {
		if (typeof this.data.onChange == "function") this.data.onChange(this.data.value || "", e);
	}

	//render
	render(vnode: any) {
		return m("form.form-floating", {
			submit: (e: Event) => {
				this.onSubmit(e);
			},
		}, [
			m(`input.form-control[type='password'][id='floatingPassword'][placeholder='${this.data.label}']`, {
				oninput: (e: Event) => {
					this.onInput(e);
				},
				onchange: (e: Event) => {
					this.onChange(e);
				},
			}),
			m("label[for='floatingPassword']", this.data.label),
		]);
	}
}
