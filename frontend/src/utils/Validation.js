const isValid = (type, value) => {
  switch (type) {
    case "username":
      const usernamePattern = /[a-zA-Z][a-zA-Z0-9]{3,19}$/;
      return usernamePattern.test(value);
    case "fullname":
      const fullnamePattern =
        /^[А-ЯЁ][а-яё]*(?:[-][А-ЯЁ][а-яё]*)*\s[А-ЯЁ][а-яё]*(?:[-][А-ЯЁ][а-яё]*)*(?:\s[А-ЯЁ][а-яё]*(?:[-][А-ЯЁ][а-яё]*)*)?$/;
      return fullnamePattern.test(value);
    case "email":
      const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
      return emailPattern.test(value);
    case "password":
      const passwordPattern =
        /^(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*()_+\-=\[\]{};':"\\|,.<>\/?]).{6,}$/;
      return passwordPattern.test(value);
  }
};

export default isValid;
