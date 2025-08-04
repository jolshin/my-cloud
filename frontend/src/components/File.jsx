import React from "react";

import "../styles/File.css"; // Assuming you have a CSS file for styling

function File({ file, onDelete, onDownload, onShare, unShare, onRename }) {

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
      <p className="file-name">{file.description}</p>
      <button className="rename-button" onClick={() => onRename(file.id, file.filename)}>
        Rename
      </button>
      <button className="download-button" onClick={() => onDownload(file.id, file.filename)}>
        Download
      </button>
      <button className="delete-button" onClick={() => onDelete(file.id)}>
        Delete
      </button>
      {file.share_link == null || file.share_link == "" ? (
      <button className="share-button" onClick={() => onShare(file.id)}>
        Share
      </button>) : 
      (
      <button className="unshare-button" onClick={() => unShare(file.id)}>
        Unshare
      </button>
      )}
      { file.share_link == null || file.share_link == "" ? "" :
      <button className="copy-link-button" onClick={() => navigator.clipboard.writeText(file.share_link)}>
        {file.share_link}
      </button>
      }
    </div>
  );
}

export default File;