import Handler from "../def/ApiHandler.ts";
import { Input, Output } from "../../../f/api/imp/Test1.ts";


export default class Test1Handler extends Handler<Input, Output>() {
	process(input: Input): Output {
		return { var3: input.var1 + "test3", var4: input.var2 + 41 };
	}
}
