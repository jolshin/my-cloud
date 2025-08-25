import { useState, useEffect, useMemo, useCallback } from "react";
import { debounce } from "lodash";
import api from "../api";
import GetUsers from "../services/GetUsers";
import User from "../components/User";
import RegisterForm from "./RegisterForm";
import ErrorHandler from "../utils/ErrorHandler";
import "../styles/Admin.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faXmark,
  faUserPlus,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";

import { useDispatch } from "react-redux";
import { setActiveStorageOwner } from "../features/users/storage-slice";

function Admin() {
  const [users, setUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const dispatch = useDispatch();

  useEffect(() => {
    getUsers();
  }, []);

  const getUsers = async () => {
    try {
      const data = await GetUsers();
      setUsers(data);
    } catch (error) {
      ErrorHandler(error);
    }
  };

  const showStorage = (id, username) => {
    dispatch(setActiveStorageOwner({ id, username }));
    showHideAdminPanel();
    showHideNavbar();
  };

  const showHideNavbar = () => {
    const el = document.getElementById("navbar");
    el.classList.toggle("show");
  };

  const deleteUser = (id) => {
    api
      .delete(`/api/user/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("Пользователь удален успешно");
        else alert("Не удалось удалить пользователя");
        getUsers();
      })
      .catch((error) => ErrorHandler(error));
  };

  const activateIsStaff = (id) => {
    api
      .patch(`/api/user/update/${id}`, { is_staff: true })
      .then((res) => {
        if (res.status === 200) alert("Административные права активированы");
        else alert("Не удалось активировать права администратора");
        getUsers();
      })
      .catch((error) => ErrorHandler(error));
  };

  const inActivateIsStaff = (id) => {
    api
      .patch(`/api/user/update/${id}`, { is_staff: false })
      .then((res) => {
        if (res.status === 200) alert("Административные права деактивированы");
        else alert("Не удалось деактивировать права администратора");
        getUsers();
      })
      .catch((error) => ErrorHandler(error));
  };

  const showHideAdminPanel = () => {
    const el = document.getElementById("admin-panel");
    el.classList.toggle("show");
  };

  const showHideUploadForm = () => {
    const regEl = document.getElementById("register-form");
    const lookEL = document.getElementById("lookup-form");
    if (lookEL.classList.contains("show")) {
      lookEL.classList.toggle("show");
    }
    regEl.classList.toggle("show");
    regEl.classList.toggle("hide");
  };

  const showHideLookUpForm = () => {
    const lookEL = document.getElementById("lookup-form");
    const regEl = document.getElementById("register-form");
    if (regEl.classList.contains("show")) {
      regEl.classList.toggle("show");
    }
    document.getElementById("lookUpField").value = "";
    debounceSearch("");
    lookEL.classList.toggle("show");
    lookEL.classList.toggle("hide");
  };

  const debounceSearch = useCallback(
    debounce((term) => {
      setSearchTerm(term);
    }, 300),
    []
  );

  const filteredData = useMemo(() => {
    if (!searchTerm) return users;

    return users.filter((user) =>
      Object.values(user).some(
        (value) =>
          value &&
          value.toString().toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [users, searchTerm]);

  return (
    <>
      <div id="admin-panel">
        <button id="hide-admin-panel" onClick={() => showHideAdminPanel()}>
          <FontAwesomeIcon icon={faXmark} size="2x" />
        </button>
        <div className="add-button-container">
          <button
            onClick={() => {
              showHideUploadForm();
            }}
            title="Добавить пользователя"
          >
            <FontAwesomeIcon icon={faUserPlus} />
          </button>
          <button
            onClick={() => showHideLookUpForm()}
            title="Найти пользователя"
          >
            <FontAwesomeIcon icon={faMagnifyingGlass} />
          </button>
        </div>
        <div className="form-container">
          <div id="lookup-form" className="hide">
            <input
              type="text"
              placeholder="Что-то потеряли?"
              id="lookUpField"
              onChange={(e) => debounceSearch(e.target.value)}
            />
          </div>
        </div>
        <div className="form-container">
          <div id="register-form" className="hide">
            <RegisterForm onGetUsers={getUsers} />
          </div>
        </div>
        <div>
          {filteredData.map((user) => (
            <User
              user={user}
              key={user.id}
              onDelete={deleteUser}
              onActivatePermissions={activateIsStaff}
              onInActivatePermissions={inActivateIsStaff}
              onShowStorage={showStorage}
            />
          ))}
        </div>
      </div>
      <div
        id="overlay"
        onClick={() => {
          showHideNavbar();
          showHideAdminPanel();
        }}
      ></div>
    </>
  );
}

export default Admin;
