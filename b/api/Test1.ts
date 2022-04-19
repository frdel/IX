import { Input, Output } from "../../f/api/Test1Api.ts";
import Handler from "../com/ApiHandler.ts";

export default class Test1Handler extends Handler<Input, Output> {
  async handleCall(input: Input): Promise<Output> {
    const out: Output = {
      var3: "done processinf",
      var4: input.var2 + 42,
    };
    return await out;
  }
}
