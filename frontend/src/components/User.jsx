import "../styles/User.css";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTrash,
  faDatabase,
  faBan,
  faUserSecret,
} from "@fortawesome/free-solid-svg-icons";

function User({
  user,
  onDelete,
  onActivatePermissions,
  onInActivatePermissions,
  onShowStorage,
}) {
  return (
    <div className="user-container">
      <span className="left">id:</span>
      <span className="right"> {user.id}</span>
      <br />
      <span className="left">Пользователь:</span>
      <span className="right"> {user.username}</span>
      <br />
      <span className="left">ФИО:</span>
      <span className="right">{user.fullname}</span> 
      <br />
      <span className="left">Эл.почта:</span>
      <span className="right">{user.email}</span> 
      <br />
      {user.is_staff ? <p className="right">администратор</p> : null}
      <br />
      {user.is_staff == false ? (
        <button
          className="activate-permissions-button"
          title="Активировать права администратора"
          onClick={() => onActivatePermissions(user.id)}
        >
          <FontAwesomeIcon icon={faUserSecret} />
        </button>
      ) : (
        <button
          className="inactivate-permissions-button "
          title="Дуактивировать права администратора"
          onClick={() => onInActivatePermissions(user.id)}
        >
          <FontAwesomeIcon icon={faBan} />
        </button>
      )}
      <button
        className="user-delete-button"
        title="Удалить пользователя"
        onClick={() => onDelete(user.id)}
      >
        <FontAwesomeIcon icon={faTrash} />
      </button>
      <button
        className="user-delete-button"
        title="Показать хранилище пользователя"
        onClick={() => onShowStorage(user.id, user.username)}
      >
        <FontAwesomeIcon icon={faDatabase} />
      </button>
    </div>
  );
}

export default User;
