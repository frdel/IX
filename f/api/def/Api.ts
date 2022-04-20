import Request from "./Request.ts";

export default abstract class Api<I, O> {
  //call API from frontend
  public async callApi(input: I): Promise<O> {
    const apiName = this.getApiName();
    const response = <O> await Request.post(apiName, input);
    return response;
  }

  //return name of this API to be used in URL
  abstract getApiName(): string;
}
