export function getStringCuted(string) {
  const length = 100;
  let newString =
    string.length > length ? string.slice(0, length) + '...' : string;
  return newString.replace(/(\r\n|\n|\r)/gm, ' ');
}

export function editTime(time) {
  return `${Math.floor(time / 60)}:${time % 60}`;
  console.log('/', Math.floor(time / 60));
  console.log('%', time % 60);
  return time;
}
