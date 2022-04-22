const postRaw = async function (
	url: string,
	data: string,
	headers?: HeadersInit,
) {
	const opt: RequestInit = {
		method: "POST",
		body: data,
		headers: headers,
	};

	return await globalThis.fetch(url, opt);
};

const post = async function (
	url: string,
	data: any,
	headers?: HeadersInit,
): Promise<any> {
	headers = { "Content-Type": "application/json", ...headers };

	data = JSON.stringify(data);

	const resp = await postRaw(url, data, headers);
	const json = await resp.json();
	return json;
};

export default { post, postRaw };
