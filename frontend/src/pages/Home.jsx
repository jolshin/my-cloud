import { useState, useEffect } from "react";
import api from "../api";
import GetFiles from "../services/GetFiles";
import DeleteFile from "../services/DeleteFile";
import PatchFile from "../services/PatchFile";
import Header from "../components/Header";
import Admin from "../components/Admin";
import Dashboard from "../components/Dashboard";
import FileListView from "../components/FileListView";
import UploadForm from "../components/UploadForm";
import "../styles/Home.css";
import { useDispatch, useSelector } from "react-redux";
import { setActiveUser } from "../features/users/user-slice";
import {
  setActiveStorageOwner,
  setActiveStorageData,
} from "../features/users/storage-slice";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCloudArrowUp } from "@fortawesome/free-solid-svg-icons";

function Home() {
  const [files, setFiles] = useState([]);

  const storageOwnerId = useSelector((state) => state.storage.storageOwnerId);
  const storageOwnerUsername = useSelector(
    (state) => state.storage.storageOwnerUsername
  );
  const activeUserUsername = useSelector((state) => state.user.userUsername);
  const activeUserPermissions = useSelector((state) => state.user.userIsStaff);
  const dispatch = useDispatch();

  if (!activeUserUsername) {
    api
      .get("/api/home/")
      .then((res) => res.data)
      .then((data) => {
        dispatch(setActiveUser(data));
        dispatch(setActiveStorageOwner(data));
      })
      .catch((error) => alert(error));
  }

  useEffect(() => {
    getFiles();
  }, [storageOwnerId]);

  const getFiles = async () => {
    try {
      const data = await GetFiles(storageOwnerId);
      setFiles(data);
      dispatch(setActiveStorageData(data));
    } catch (error) {
      alert(error);
    }
  };

  const deleteFile = async (id) => {
    try {
      const res = await DeleteFile(id);
    } catch (error) {
      alert(error);
    }
    getFiles();
  };

  const downloadFile = async (id, filename) => {
    try {
      const res = await api.get(`/api/files/download/${id}/`, {
        responseType: "arraybuffer",
      });

      const url = window.URL.createObjectURL(new Blob([res.data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", filename);
      document.body.appendChild(link);
      link.click();

      patchFile(id, {
        last_downloaded: new Date(Date.now()).toISOString(),
      });
    } catch (error) {
      alert(error);
    }
  };

  const patchFile = async (id, data) => {
    try {
      const res = await PatchFile(id, data);
    } catch (error) {
      alert(error);
    }
    getFiles();
  };

  const shareFile = (id) => {
    patchFile(id, {
      share_link: `${import.meta.env.VITE_HOST_URL}/share/${id}/`,
    });

    getFiles();
  };

  const unShareFile = (id) => {
    patchFile(id, { share_link: null });
    getFiles();
  };

  const renameFile = (id, filename) => {
    patchFile(id, { filename: filename });
    getFiles();
  };

  const editDescription = (id, newDescription) => {
    patchFile(id, { description: newDescription });
    getFiles();
  };

  const showHideUploadForm = () => {
    const el = document.getElementById("upload-form");
    el.classList.toggle("show");
    el.classList.toggle("hide");
  };

  return (
    <>
      <Header username={activeUserUsername} />
      {activeUserPermissions ? (
        <aside>
          <Admin />
        </aside>
      ) : null}
      <main>
        <div className="file-list">
          <div className="table_caption">
            <p className="form-header">
              {storageOwnerUsername !== activeUserUsername ? (
                <>Файлы пользователя {storageOwnerUsername}</>
              ) : (
                <>Мои файлы</>
              )}
            </p>

            <button
              className="upload-form-button"
              onClick={() => {
                showHideUploadForm();
              }}
            >
              <FontAwesomeIcon icon={faCloudArrowUp} />
            </button>
            <Dashboard />
            <div className="form-container">
              <div id="upload-form" className="hide">
                <UploadForm
                  onUpdateFileList={getFiles}
                  onHide={showHideUploadForm}
                  files={files}
                />
              </div>
            </div>
            <br />
          </div>
          <FileListView
            files={files}
            onDownload={downloadFile}
            onDelete={deleteFile}
            onShare={shareFile}
            unShare={unShareFile}
            onRename={renameFile}
            onDescriptionEdit={editDescription}
          />
        </div>
      </main>
    </>
  );
}

export default Home;
