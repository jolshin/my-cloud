import api from "../api";
import { useState } from "react";
import isValid from "../utils/Validation";

export default function RegisterForm({ onGetUsers, styleName="", header="" }) {
  const [username, setUsername] = useState("");
  const [fullname, setFullname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passCheck, setPassCheck] = useState("")

  const createUser = (e) => {
    e.preventDefault()

    if (passCheck !== password) {
      alert("Пароль не совпадает");
      return;
    }
    if (!username || !fullname || !email || !password) {
      alert("Все поля должны быть заполнены");
      return;
    }

    if (!isValid("username", username)) {
      alert(
        "Имя пользователя/псевдоним некорректен. Допускаются только латинские буквы и цифры, первый символ должен быть буквой, длина от 4 до 20 символов"
      );
      return;
    }

    if (!isValid("fullname", fullname)) {
      alert("ФИО некорректно");
      return;
    }

    if (!isValid("email", email)) {
      alert("Эл.почта некорректна");
      return;
    }

    if (!isValid("password", password)) {
      alert("Пароль некорректен. Длина пароля должна составлять не менее 6 символов, должны присутствовать: одна заглавная буква, одна цифра и один специалный символ.");
      return;
    }

    api
      .post("/api/user/register/", { username, fullname, email, password })
      .then((res) => {
      if (res.status === 201) {
        alert("Пользователь создан успешно");
        setUsername("");
        setFullname("");
        setEmail("");
        setPassword("");
        setPassCheck("")
        onGetUsers();
      
      } else {
        alert("Не удалось создать пользователя");
      }
      })
      .catch((error) => {
      if (error.response && error.response.data) {
        alert(
        `Ошибка: ${error.response.status}\n${JSON.stringify(error.response.data)}`
        );
      } else {
        alert(error.message);
      }
      });
  };

  return (
    <form onSubmit={createUser} className={styleName}>
         {header ? <p className="form-header">{header}</p> : null}
      <input
        type="text"
        id="usrname"
        name="username"
        placeholder="Имя пользователя/псевдоним"
        onChange={(e) => {
          setUsername(e.target.value);
        }}
        value={username}
      />
      <br />
      <input
        type="text"
        id="fullname"
        name="fullname"
        placeholder="Полное ФИО"
        value={fullname}
        onChange={(e) => {
          setFullname(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        id="email"
        name="email"
        placeholder="Электронная почта"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        id="password"
        name="password"
        placeholder="Пароль"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      />
      <br />
      <input
        type="text"
        id="passwordCheck"
        name="passwordCheck"
        placeholder="Введите пароль еще раз"
        value={passCheck}
        onChange={(e) => {
          setPassCheck(e.target.value);
        }}
      />
      <br />
      <input type="submit" name="create" value="Добавить пользователя" />
    </form>
  );
}
