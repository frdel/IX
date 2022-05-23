import m from "../html/Mithril.ts";
import Component from "./Component.ts";

/**
 * description added
 * on two lines
 */
type Data = {
	type?: Type;
	label?: string;
	value?: string;
	onInput?: Handler;
	onChange?: Handler;
	onSubmit?: Handler;
};

enum Type {
	Password = "password",
	Text = "text",
	Date = "date",
	DateTimeLocal = "datetime-local",
	Color = "color",
	Email = "email",
	// File = "file",
	// Image = "image",
	Month = "month",
	Number = "number",
	Tel = "tel",
	Search = "search",
}

interface Handler {
	(value: string, event: Event): void;
}

export default class CopyMe extends Component<Data, Data>() {
	static type = Type;

	fixData() {
		//default data
		if (!this.data.label) this.data.label = "";
		if (!this.data.value) this.data.value = "";
		if (!this.data.type) this.data.type = Type.Text;
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
		// e.preventDefault();
		if (typeof this.data.onSubmit == "function") this.data.onSubmit(this.data.value || "", e);
	}

	//render
	render(vnode: any) {
		return m("form.form-floating", {
			onsubmit: (e: Event) => {
				this.onSubmit(e);
			},
		}, [
			m(`input.form-control[id='floatingPassword${this.data.label}']`, {
				type: this.data.type,
				placeholder: this.data.label,
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
