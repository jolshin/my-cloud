import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark, faBars } from "@fortawesome/free-solid-svg-icons";
import { useSelector } from "react-redux";
import "../styles/Navbar.css"

export default function Header({ method, username }) {
  const iconSize = () => {
    return "2x";
  };

  const activeUserPermissions = useSelector((state) => state.user.userIsStaff);

  const showHideNavbar = () => {
    const el = document.getElementById("navbar");
    el.classList.toggle("show");
  };

  const showHideAdminPanel = (e) => {
    e.preventDefault()
    const el = document.getElementById("admin-panel");
    el.classList.toggle("show");
  }

  if (method === "login") {
    return (
      <header>
        <button id="open-navbar-button" onClick={() => showHideNavbar()}>
          <FontAwesomeIcon icon={faBars} size={iconSize()} />
        </button>

        <div id="overlay"></div>
        <nav id="navbar">
          <ul>
            <li>
              <button id="close-navbar-button" onClick={() => showHideNavbar()}>
                <FontAwesomeIcon icon={faXmark} size={iconSize()} />
              </button>
            </li>
            <li className="home-li">
              <a href="/" >МОХ</a>
            </li>
            <li>
              <a href="/register">Регистрация</a>
            </li>
            <li>
              <a href="/login" className="active-link accent-link">
                Вход
              </a>
            </li>
          </ul>
        </nav>

        <div id="overlay" onClick={() => showHideNavbar()}></div>
      </header>
    );
  } else if (method === "register") {
    return (
      <header>
        <button id="open-navbar-button" onClick={() => showHideNavbar()}>
          <FontAwesomeIcon icon={faBars} size={iconSize()} />
        </button>
        <nav id="navbar">
          <ul>
            <li>
              <button id="close-navbar-button" onClick={() => showHideNavbar()}>
                <FontAwesomeIcon icon={faXmark} size={iconSize()} />
              </button>
            </li>
            <li className="home-li">
              <a href="/">МОХ</a>
            </li>
            <li>
              <a href="/register" className="active-link">
                Регистрация
              </a>
            </li>
            <li>
              <a href="/login" className="accent-link">
                Вход
              </a>
            </li>
          </ul>
        </nav>

        <div id="overlay" onClick={() => showHideNavbar()}></div>
      </header>
    );
  } else if (method === "welcome") {
    return (
      <header>
        <button id="open-navbar-button" onClick={() => showHideNavbar()}>
          <FontAwesomeIcon icon={faBars} size={iconSize()} />
        </button>
        <nav id="navbar">
          <ul>
            <li>
              <button id="close-navbar-button" onClick={() => showHideNavbar()}>
                <FontAwesomeIcon icon={faXmark} size={iconSize()} />
              </button>
            </li>
            <li className="home-li">
              <a href="/" className="active-link">
                МОХ
              </a>
            </li>
            <li>
              <a href="/register">Регистрация</a>
            </li>
            <li>
              <a href="/login" className="accent-link">
                Вход
              </a>
            </li>
          </ul>
        </nav>

        <div id="overlay" onClick={() => showHideNavbar()}></div>
      </header>
    );
  } else {
    return (
      <header>
        <button id="open-navbar-button" onClick={() => showHideNavbar()}>
          <FontAwesomeIcon icon={faBars} size={iconSize()} />
        </button>
        <nav id="navbar">
          <ul>
            <li>
              <button id="close-navbar-button" onClick={() => showHideNavbar()}>
                <FontAwesomeIcon icon={faXmark} size={iconSize()} />
              </button>
            </li>
            <li className="home-li">
              <a href="/home" className="active-link">
                МОХ
              </a>
            </li>

            {activeUserPermissions ? (
              <li>
                <a href=" " onClick={(e) => showHideAdminPanel(e)}>Пользователи МОХ</a>
              </li>
            ) : null}
            <li>
              <a href="/home" className="accent-link">
                {username}
              </a>
            </li>
            <li>
              <a href="/logout">Выход</a>
            </li>
          </ul>
        </nav>

        <div id="overlay" onClick={() => showHideNavbar()}></div>
      </header>
    );
  }
}
