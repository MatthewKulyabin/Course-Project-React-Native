export function getStringCuted(string) {
	const length = 100;
	return string.length > length ? string.slice(0, length) + '...' : string;
}
