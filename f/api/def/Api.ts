import Request from "./Request.ts";

export default function Api<Input, Output>(handlerFile: string) {
	class Api {
		public static async call(input: Input): Promise<Output> {
			const api = new this();
			input = api.editInput(input);
			let output = <Output> await Request.post(handlerFile, input);
			output = api.editOutput(output);
			return output;
		}

		editInput(input: Input): Input {
			return input;
		}

		editOutput(output: Output): Output {
			return output;
		}
	}
	return Api;
}
