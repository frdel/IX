import m from "../html/Mithril.ts";
import M from "./M.ts";

export default function Component<D>() {
	interface OnChange {
		(model: D, key: string, value: any): void;
	}

	interface LinkModels {
		(fieldA: string, componentB: Component, fieldB: string): PreComponent;
	}

	type Meta = {
		onChange?: OnChange;
	};

	type PreComponent = {
		data: D;
		linkModels: LinkModels;
	};

	abstract class Component {
		private initialized = false;

		data = <D> {};

		static m(data?: D, onChange?: OnChange) {
			//build meta structure
			const meta: Meta = { onChange };

			//mithrilize
			const em = m(this.prototype, { _data: data, _meta: meta });

			//enhace to PreComponent
			em.data = data;

			em.linkModels = function (fieldA: string, componentB: Component, fieldB: string) {
				M.linkModels(data, fieldA, componentB.data, fieldB);
				return em;
			};

			//return as PreComponent
			return <PreComponent> em;
		}

		// constructor(vnode: any) {
		// 	this.data = M(vnode.attrs._data);
		// 	this.copyData(vnode);
		// }

		private view(vnode: any) {
			this.copyData(vnode);
			return this.render(vnode);
		}

		private copyData(vnode: any) {
			//initialize model if needed
			if (!this.initialized) this.initialize(vnode);

			//copy fields to model
			Object.assign(this.data, vnode.attrs._data);

			// this.data = vnode.attrs._data;
			this.fixData();
		}

		private initialize(vnode: any) {
			//initialize model and set onChange
			this.data = M(
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
