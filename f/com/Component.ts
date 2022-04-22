import m from "../html/Mithril.ts";
import Model from "./Model.ts";

export default function Component<D, I>() {
	interface OnChange {
		(model: D, key: string, value: any, previous: any): void;
	}

	interface LinkModels {
		(fieldA: string, componentB: Component, fieldB: string): PreComponent;
	}

	type Meta = {
		onChange?: OnChange;
	};

	type PreComponent = {
		data: D;
	};

	abstract class Component {
		private initialized = false;

		data = <D> {};

		static m(data?: I, onChange?: OnChange) {
			//build meta structure
			const meta: Meta = { onChange };

			//mithrilize
			const em = m(this.prototype, { _data: data, _meta: meta });

			//enhace to PreComponent
			em.data = data;

			//return as PreComponent
			return <PreComponent> em;
		}

		//mithril renrering
		private view(vnode: any) {
			this.copyData(vnode);
			return this.render(vnode);
		}

		//copy data from vnode - from parent
		private copyData(vnode: any) {
			//initialize model if needed
			if (!this.initialized) this.initialize(vnode);

			//copy input fields to model
			this.copyInput(vnode.attrs._data);

			// this.data = vnode.attrs._data;
			this.fixData();
		}

		//copy input fields to model
		protected copyInput(input: I) {
			Object.assign(this.data, input);
		}

		private initialize(vnode: any) {
			//initialize model and set onChange
			this.data = Model(
				vnode.attrs._data || <D> {},
				typeof vnode.attrs._meta?.onChange == "function" ? (...p) => vnode.attrs._meta?.onChange(...p) : undefined,
			);
			//flag
			this.initialized = true;
		}

		protected fixData() {}

		abstract render(vnode: any): any;
	}

	return Component;
}
