export async function useApi<T = Record<string, any>>(
	method: "GET" | "POST" | "PATCH" | "PUT" | "DELETE",
	path: string,
	body?: FormData | Record<string, any>,
): Promise<T> {
	let baseUrl = process.env.NEXT_PUBLIC_API_URL;
	if (baseUrl?.endsWith("/")) {
		baseUrl = baseUrl.slice(0, -1);
	}

	const isFormData = body instanceof FormData;

	const opts: RequestInit = {
		method,
	};

	if (method === "GET") {
		opts.cache = "no-store";
	}

	if (["POST", "PATCH", "PUT"].includes(method)) {
		opts.body = isFormData ? body : JSON.stringify(body);

		if (!isFormData) {
			opts.headers = {
				"Content-Type": "application/json",
			};
		}
	}

	const res = await fetch(`${baseUrl}${path}`, opts);

	if (!res.ok) {
		throw new Error("Erro ao acessar a API");
	}

	let content = await res.text();

	try {
		content = JSON.parse(content);
	} catch {}

	return content as T;
}
