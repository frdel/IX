import Api from "../def/Api.ts";

export type Input = {
	var1: string;
	var2: number;
};

export type Output = {
	var3: string;
	var4: number;
};

export default class Test2 extends Api<Input, Output>("Test2.ts") {
	editInput(input: Input) {
		input.var1 += "--";
		return input;
	}
}
