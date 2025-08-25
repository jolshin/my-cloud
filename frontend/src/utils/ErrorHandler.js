export default function ErrorHandler(error) {
  if (error.response && error.response.data) {

    for (const [_, value] of Object.entries(error.response.data)) {
        if (typeof value === 'object') {
            ObjectRetriever(value);
            continue;
        }
      alert(
        `Код ошибки: ${error.response.status}\nОписание: ${value}\n`
      );
    }
  } else {
    alert(error.message);
  }
  return;
}

function ObjectRetriever(obj) {
  for (const [_, value] of Object.entries(obj)) {
    ErrorHandler(value);
  }
  return
}