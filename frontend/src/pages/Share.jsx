import { shareApi } from "../api";
import { useParams } from "react-router-dom";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

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
      .catch((error) => navigate("/not-found"));
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
            if (res.status === 200) alert("Date updated successfully");
            else alert("Failed to update date");
            getFile();
          })
          .catch((error) => alert(error));
      })
      .catch((error) => alert(error));
  };

  return (
    <div className="file-container">
      <p className="file-name">{file.filename}</p>
      <p className="file-date">
        {new Date(file.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <button className="download-button" onClick={() => downloadFile()}>
        Download
      </button>
    </div>
  );
}

export default Share;
