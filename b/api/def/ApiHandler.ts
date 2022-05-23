import Api from "../../../f/api/def/Api.ts";

export default function ApiHandler<Input, Output>() {
	abstract class ApiHandler {
		static async processCall(handlerFile: string, input: Input): Promise<Output> {
			const handler = await import(handlerFile);
			const result = await new handler.default().process(input);
			return result;
		}

		abstract process(input: Input): Output;
	}
	return ApiHandler;
}
