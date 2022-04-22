export default abstract class ApiHandler<I, O> {
	abstract handleCall(input: I): Promise<O>;

	async processCall(inputObject: any): Promise<any> {
		return await this.handleCall(<I> inputObject);
	}
}
