export default abstract class ApiHandler<I, O> {
  abstract handleCall(input: I): Promise<O>;

  async processCall(inputObject: any): Promise<any> {
    const input: I = inputObject;
    const output = await this.handleCall(input);
    // const outputJSON = JSON.stringify(output);
    // return outputJSON;
    return output;
  }
}
