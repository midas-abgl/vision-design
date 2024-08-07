export async function getApi<T = Record<string, any>>(path: string): Promise<T> {
	let baseUrl = process.env.NEXT_PUBLIC_URL;
	if (baseUrl?.endsWith("/")) {
		baseUrl = baseUrl.slice(0, -1);
	}

	return await (await fetch(`${baseUrl}${path}`)).json();
}
