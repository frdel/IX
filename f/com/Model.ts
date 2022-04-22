interface OnChange {
	(model: unknown, key: string, value: any, previous: any): void;
}

export default function Model<T extends Record<string, unknown>>(
	data: T,
	onChange?: OnChange,
): T {
	const proxy = new Proxy<T>(data, {
		//proxy setter
		set: function (target, key, value) {
			//get previous value
			const previous = target[<string> key];
			//write changes to model
			(<Record<string, unknown>> target)[<string> key] = value;

			//call handler function if any
			if (!Object.is(value, previous) && typeof (onChange) == "function") onChange(target, key.toString(), value, previous);

			return true;
		},
	});

	//result
	return proxy;
}
