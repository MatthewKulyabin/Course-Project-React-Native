export function getStringCuted(string) {
  const length = 100;
  let newString =
    string.length > length ? string.slice(0, length) + '...' : string;
  return newString.replace(/(\r\n|\n|\r)/gm, ' ');
}
