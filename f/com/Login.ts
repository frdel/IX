import m from "../html/Mithril.ts";
import Component from "./Component.ts";
import Button from "./Button.ts";
import Toolbar from "./Toolbar.ts";

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
					m("form", [
						// m("img.mb-4[src='/docs/5.1/assets/brand/bootstrap-logo.svg'][alt=''][width='72'][height='57']"),
						m("h1.h3.mb-3.fw-normal", "Please sign in"),
						m("div.form-floating", [
							m("input.form-control[type='email'][id='floatingInput'][placeholder='name@example.com']"),
							m("label[for='floatingInput']", "Email address"),
						]),
						m("div.form-floating", [
							m("input.form-control[type='password'][id='floatingPassword'][placeholder='Password']"),
							m("label[for='floatingPassword']", "Password"),
						]),
						m(
							"div.checkbox.mb-3",
							m("label", [
								m("input[type='checkbox'][value='remember-me']"),
								" Remember me ",
							]),
						),
						m("button.w-100.btn.btn-lg.btn-primary[type='submit']", "Sign in"),
						m("p.mt-5.mb-3.text-muted", "© 2017–2021"),
					]),
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
		
		.form-signin input[type="email"] {
		  margin-bottom: -1px;
		  border-bottom-right-radius: 0;
		  border-bottom-left-radius: 0;
		}
		
		.form-signin input[type="password"] {
		  margin-bottom: 10px;
		  border-top-left-radius: 0;
		  border-top-right-radius: 0;
		}
		`;
	}
}
