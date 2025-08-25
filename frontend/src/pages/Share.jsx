import { shareApi } from "../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorHandler from "../utils/ErrorHandler";
import sizify from "../utils/Sizify";
import "../styles/Share.css";

function Share() {
  const { id } = useParams();

  const [file, setFile] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    getFile();
  }, []);

  const getFile = () => {
    shareApi
      .get(`/api/share/${id}/`)
      .then((res) => res.data)
      .then((data) => {
        setFile(data);
      })
      .catch(() => navigate("/not-found"));
  };

  const downloadFile = () => {
    shareApi
      .get(`/api/share/download/${id}/`, { responseType: "arraybuffer" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", file.filename);
        document.body.appendChild(link);
        link.click();

        shareApi
          .patch(`/api/share/download/${id}/`, { last_downloaded: Date.now })
          .then((res) => {
            if (!res.status === 200)
              alert("Не удалось обновить дату скачивания");
            getFile();
          })
          .catch((error) => ErrorHandler(error));
      })
      .catch((error) => ErrorHandler(error));
  };

  return (
    <div className="file-container">
      <a href="/" className="mox">MOX</a>
      <p className="file-container-header">Скачать файл</p>
      <div className="file-name">
        <span className="left">Имя&nbsp;</span>
        <span className="right">{file.filename}</span>
      </div>
      <div className="file-description">
        <span className="left">Комменатрий&nbsp;</span>
        <span className="right">{file.description}</span>
      </div>
      <div className="file-size">
        <span className="left">Размер&nbsp;</span>
        <span className="right">{sizify(file.byte_size)}</span>
      </div>
      <button className="download-button" onClick={() => downloadFile()}>
        Скачать
      </button>
    </div>
  );
}

export default Share;
