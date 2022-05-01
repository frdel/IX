import m from "../html/Mithril.ts";
import Component from "./Component.ts";
import Button from "./Button.ts";
import Toolbar from "./Toolbar.ts";
import FormField from "./FormField.ts";

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
		return [
			Toolbar.m({ title: "Login1" }),
			// Button.m({ text: "wedew", type: Button.type.Danger }),
			m("style", this.getCSS()),
			m(
				"div.login.text-center",
				m(
					"main.form-signin",
					// m("form",
					[
						// m("img.mb-4[src='/docs/5.1/assets/brand/bootstrap-logo.svg'][alt=''][width='72'][height='57']"),
						m("h1.h3.mb-3.fw-normal", "Please sign in"),

						FormField.m({ label: "Text", type: FormField.type.Text }),
						FormField.m({ label: "Color", type: FormField.type.Color }),
						FormField.m({ label: "DateTimeLocal", type: FormField.type.DateTimeLocal }),
						FormField.m({ label: "Date", type: FormField.type.Date }),
						FormField.m({ label: "Email", type: FormField.type.Email }),
						// FormField.m({ label: "File", type: FormField.type.File }),
						// FormField.m({ label: "Image", type: FormField.type.Image }),
						FormField.m({ label: "Month", type: FormField.type.Month }),
						FormField.m({ label: "Number", type: FormField.type.Number }),
						FormField.m({ label: "Tel", type: FormField.type.Tel }),
						FormField.m({ label: "Search", type: FormField.type.Search }),
						m(
							"div.checkbox.mb-3",
							m("label", [
								m("input[type='checkbox'][value='remember-me']"),
								" Remember me ",
							]),
						),
						m("button.w-100.btn.btn-lg.btn-primary[type='submit']", "Sign in"),
						m("p.mt-5.mb-3.text-muted", "© 2017–2021"),
					],
					// ),
				),
			),
		];
	}

	getCSS() {
		return `
		.login {
		  height: 100%;
		  display: flex;
		  align-items: center;
		  padding-top: 40px;
		  padding-bottom: 40px;
		 }
		
		.form-signin {
		  width: 100%;
		  max-width: 330px;
		  padding: 15px;
		  margin: auto;
		}
		
		.form-signin .checkbox {
		  font-weight: 400;
		}
		
		.form-signin .form-floating:focus-within {
		  z-index: 2;
		}
		
		.form-signin form:first-of-type input {
		  margin-bottom: -1px;
		  border-bottom-right-radius: 0;
		  border-bottom-left-radius: 0;
		}
		
		.form-signin form:last-of-type input{
		  margin-bottom: 10px;
		  border-top-left-radius: 0;
		  border-top-right-radius: 0;
		}

		.form-signin :not(form:first-of-type):not(form:last-of-type) input {
			margin-bottom: -1px;
			border-bottom-right-radius: 0;
			border-bottom-left-radius: 0;
			border-top-left-radius: 0;
			border-top-right-radius: 0;
		  }
		`;
	}
}
