export function setUrlState(key: string, value: any): string {
	const url = new URL(document.URL);

	if (url.searchParams.get(key) === value) {
		url.searchParams.delete(key);
	} else {
		url.searchParams.set(key, value);
	}

	return url.toString();
}
