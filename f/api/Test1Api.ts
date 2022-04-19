import Api from "../com/Api.ts";

export type Input = {
  var1: string;
  var2: number;
};

export type Output = {
  var3: string;
  var4: number;
};

export class Test1 extends Api<Input, Output> {
  getApiName(): string {
    return "Test1";
  }
}
