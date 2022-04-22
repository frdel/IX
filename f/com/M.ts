interface OnChange {
	(model: unknown, key: string | symbol, value: any): void;
}

export default function M<T extends Record<string, unknown>>(
	data: T,
	onChange?: OnChange,
): T {
	const proxy = new Proxy<T>(data, {
		//proxy setter
		set: function (target, key, value) {
			//write changes to model
			(<Record<string, unknown>> target)[<string> key] = value;

			//call handler function if any
			if (typeof (onChange) == "function") onChange(target, key, value);

			//change other linked models
			reflectLinks(target, key);

			return true;
		},
	});
	//result
	return proxy;
}

//link between fields of two models
type Link = {
	fieldA: string;
	modelB: any;
	fieldB: string;
};

M.linkModels = function (
	modelA: any,
	fieldA: string,
	modelB: any,
	fieldB: string,
) {
	//link from A to B
	if (!modelA.modelLinks) modelA.modelLinks = [];
	modelA.modelLinks.push({ fieldA, modelB, fieldB });

	//link from B to A
	if (!modelB.modelLinks) modelB.modelLinks = [];
	modelB.modelLinks.push({ fieldA: fieldB, modelB: modelA, fieldB: fieldA });
};

function reflectLinks(model: any, key: string | symbol) {
	if (model.modelLinks) {
		for (const link of <Link[]> model.modelLinks) {
			if (link.fieldA == key) {
				const a = model[link.fieldA];
				const b = link.modelB[link.fieldB];
				if (a != b) link.modelB[link.fieldB] = a;
			}
		}
	}
}
