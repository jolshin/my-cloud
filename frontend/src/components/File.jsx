import React from "react";

import "../styles/File.css"; // Assuming you have a CSS file for styling

function File({ file, onDelete, onDownload }) {

  return (
    <div className="file-container">
      <p className="file-name">{file.filename}</p>
      <p className="file-content">{file.content}</p>
      <p className="file-date">
        {new Date(file.created_at).toLocaleDateString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
        })}
      </p>
      <button className="download-button" onClick={() => onDownload(file.id, file.filename)}>
        Download
      </button>
      <button className="delete-button" onClick={() => onDelete(file.id)}>
        Delete
      </button>
    </div>
  );
}

export default File;