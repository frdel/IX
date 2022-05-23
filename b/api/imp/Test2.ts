import Handler from "../def/ApiHandler.ts";
import { Input, Output } from "../../../f/api/imp/Test2.ts";


export default class Test2Handler extends Handler<Input, Output>() {
	process(input: Input): Output {
		return { var3: input.var1 + "test33", var4: input.var2 + 44 };
	}
}
