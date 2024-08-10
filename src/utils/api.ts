export async function getApi<T = Record<string, any>>(path: string): Promise<T> {
	let baseUrl = process.env.NEXT_PUBLIC_API_URL;
	if (baseUrl?.endsWith("/")) {
		baseUrl = baseUrl.slice(0, -1);
	}

	return await (
		await fetch(`${baseUrl}${path}`, {
			cache: "no-store",
		})
	).json();
}

export async function postApi<T = Record<string, any>>(
	path: string,
	body: FormData | Record<string, any>,
): Promise<T> {
	let baseUrl = process.env.NEXT_PUBLIC_API_URL;
	if (baseUrl?.endsWith("/")) {
		baseUrl = baseUrl.slice(0, -1);
	}

	const isFormData = body instanceof FormData;

	return await (
		await fetch(`${baseUrl}${path}`, {
			body: isFormData ? body : JSON.stringify(body),
			method: "POST",
			headers: {
				...(!isFormData && {
					"Content-Type": "application/json",
				}),
			},
		})
	).json();
}
