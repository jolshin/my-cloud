import { useState } from "react";
import api from "../api";
import { useNavigate } from "react-router-dom";
import { ACCESS_TOKEN, REFRESH_TOKEN, USERNAME, IS_STAFF } from "../constants";
import "../styles/Form.css";
import Header from "./Header";
import Loading from "./Loading";
import RegisterForm from "./RegisterForm";

function Form({ route, method }) {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [fullname, setFullname] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const name = method === "login" ? "Вход" : "Регистрация";

  const handleSubmit = async (e) => {
    setLoading(true);
    e.preventDefault();

    try {
      const res = await api.post(route, {
        username,
        password,
        email,
        fullname,
      });
      
        localStorage.setItem(ACCESS_TOKEN, res.data.access);
        localStorage.setItem(REFRESH_TOKEN, res.data.refresh);
        navigate("/");

        const userData = await api.get("/api/home/");

        if (userData.data.is_staff) {
          localStorage.setItem(IS_STAFF, true);
        }

        navigate("/home");
      
    } catch (error) {
      alert(
        "Возникла ошибка при обработке запроса. Пожалуйста, проверьте введенные данные и попробуйте еще раз."
      );
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <Loading />;
  }

  if (method === "login") {
    return (
      <>
        <Header method={method} />
        <form onSubmit={handleSubmit} className="form-wrapper">
          <p className="form-header">{name}</p>
          <input
            className="form-input"
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Имя пользователя/псевдоним"
          />

          <input
            className="form-input"
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Пароль"
          />

          <button className="form-button" type="submit">
            {name}
          </button>
        </form>
      </>
    );
  } else {
    return (
      <>
        <Header method={method} />
        <RegisterForm
          onGetUsers={() => navigate("/login")}
          styleName="form-wrapper"
          header="Регистрация"
        />
      </>
    );
  }
}

export default Form;
