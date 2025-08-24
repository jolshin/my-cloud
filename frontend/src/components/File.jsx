import { useState } from "react";
import sizify from "../utils/Sizify";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPencil,
  faPlus,
  faDownload,
  faTrash,
  faShare,
  faBan,
} from "@fortawesome/free-solid-svg-icons";

function File({
  file,
  index,
  onDelete,
  onDownload,
  onShare,
  unShare,
  onRename,
  onDescriptionEdit,
}) {
  const hasDescription = file.description !== null && file.description !== "";

  const [state, setState] = useState({
    filename: "",
    description: "",
    isDescriptionEditable: false,
    isNameEditable: false,
  });

  const setStyle = (e) => {
    let el = null;
    if (e.target.tagName === "SPAN") {
      el = e.target.querySelector("button");
    } else if (e.target.tagName === "BUTTON") {
      el = e.target;
    }
    if (el) {
      if (el.style.visibility === "visible" && e.type === "mouseleave") {
        el.style.visibility = "hidden";
      } else if (!el.style.visibility || el.style.visibility === "hidden") {
        el.style.visibility = "visible";
      }
    }
  };

  const updateState = (e) => {
    if (e.type === "change") {
      setState({
        ...state,
        [e.target.name]: e.target.value,
      });
    } else if (e.type === "blur" || e.type === "keydown") {
      setState({
        ...state,
        [e.target.name]: "",
        isNameEditable: false,
        isDescriptionEditable: false,
        isNewDescription: false,
      });
    }
  };

  return (
    <tr>
      <td data-label="#">{index + 1}</td>
      <td data-label="Наименование">
        {state.isNameEditable ? (
          <input
            autoFocus
            type="text"
            name="filename"
            value={state.filename}
            onChange={(e) => updateState(e)}
            onBlur={(e) => {
              if (state.isNameEditable) {
                onRename(file.id, state.filename);
                updateState(e);
              }
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                onRename(file.id, state.filename);
                updateState(e);
              }
            }}
            className="file-name-input"
          />
        ) : (
          <div>
            <span
              className="file-name"
              onMouseEnter={(e) => setStyle(e)}
              onMouseLeave={(e) => setStyle(e)}
            >
              {file.filename}
              <button
                className="file-rename-button"
                onClick={() => {
                  setState({
                    ...state,
                    isNameEditable: true,
                    filename: file.filename,
                  });
                }}
                title="Переименовать файл"
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
            </span>
          </div>
        )}
      </td>
      <td data-label="Размер">
        <span className="file-size">{sizify(file.byte_size)}</span>
      </td>
      <td data-label="Загружен">
        <span className="file-date-create">
          {new Date(file.created_at).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })}
        </span>
      </td>
      <td data-label="Последний раз скачан">
        <span className="file-date-last">
          { file.last_downloaded ? (
          new Date(file.last_downloaded).toLocaleDateString("ru-RU", {
            year: "numeric",
            month: "2-digit",
            day: "2-digit",
          })) : (<span>Не качался</span>)}
        </span>
      </td>
      <td data-label="Комментарий">
        {state.isDescriptionEditable ? (
          <input
            autoFocus
            type="text"
            name="description"
            value={state.description}
            placeholder="Комментарий"
            onChange={(e) => updateState(e)}
            onBlur={(e) => {
              if (state.isDescriptionEditable) {
                onDescriptionEdit(file.id, state.description);
                updateState(e);
              }
            }}
            onKeyDown={(e) => {
              if (e.code === "Enter") {
                onDescriptionEdit(file.id, state.description);
                updateState(e);
              }
            }}
            className="file-description-input"
          />
        ) : hasDescription ? (
          <div>
            <span
              className="file-description"
              onMouseEnter={(e) => setStyle(e)}
              onMouseLeave={(e) => setStyle(e)}
            >
              {file.description}
              <button
                className="file-edit-description-button"
                onClick={() =>
                  setState({
                    ...state,
                    isDescriptionEditable: true,
                    description: file.description,
                  })
                }
                 title="Изменить комментарий"
              >
                <FontAwesomeIcon icon={faPencil} />
              </button>
            </span>
          </div>
        ) : (
          <button
            className="file-edit-decription-button"
            onClick={() =>
              setState({
                ...state,
                isDescriptionEditable: true,
              })
            }
            title="Добавить комментарий"
          >
            <FontAwesomeIcon icon={faPlus} className="awesome_icon" />
          </button>
        )}
      </td>
      <td data-label="Действия">
        <div className="file-actions">
          <button
            className="file-download-button"
            onClick={() => onDownload(file.id, file.filename)}
            title="Скачать файл"
          >
            <FontAwesomeIcon icon={faDownload} />
          </button>
          <button
            className="file-delete-button"
            onClick={() => onDelete(file.id)}
            title="Удалить файл"
          >
            <FontAwesomeIcon icon={faTrash} />
          </button>
          {file.share_link == null || file.share_link == "" ? (
            <button
              className="file-share-button"
              onClick={() => onShare(file.id)}
              title="Поделиться файлом"
            >
              <FontAwesomeIcon icon={faShare} />
            </button>
          ) : (
            <>
              <button
                className="file-unshare-button"
                onClick={() => unShare(file.id)}
                title="Прекратить делиться файлом"
              >
                <FontAwesomeIcon icon={faBan} />
              </button>
              <button
                className="file-copy-link-button"
                onClick={() => navigator.clipboard.writeText(file.share_link)}
                title="Копировать ссылку на скачивание файла"
              >
                {file.share_link}
              </button>
            </>
          )}
        </div>
      </td>
    </tr>
  );
}

export default File;
