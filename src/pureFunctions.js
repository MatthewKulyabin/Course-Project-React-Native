export function getStringCuted(string) {
  const length = 100;
  let newString =
    string.length > length ? string.slice(0, length) + '...' : string;
  return newString.replace(/(\r\n|\n|\r)/gm, ' ');
}

export function editTime(time) {
  return `${Math.floor(time / 60)}:${time % 60}`;
}

export function hasTasks(steps) {
  for (const step of steps) {
    if (!step.tasks.length) {
      return false;
    }
  }
  return true;
}

export function alertInfo({ Alert, header, message }) {
  Alert.alert(
    header,
    message,
    [
      {
        text: 'Ok',
        style: 'ok',
      },
    ],
    { cancelable: true }
  );
}
