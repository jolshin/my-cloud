import UploadFile from "../services/UploadFile";
import DeleteFile from "../services/DeleteFile";
import { useState } from "react";
import { useSelector } from "react-redux";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faXmark } from "@fortawesome/free-solid-svg-icons";

export default function UploadForm({ onUpdateFileList, onHide, files }) {
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");
  const [duplicate, setDuplicate] = useState(null);

  const storageOwnerId = useSelector((state) => state.storage.storageOwnerId);

  const uploadFile = async (e) => {
    e.preventDefault();

    setData((prevData) => {
      prevData.append("description", description);
      prevData.append("owner", storageOwnerId);
      return prevData;
    });
    try {
      await UploadFile(data);
      onUpdateFileList();
      setContent("");
      setDescription("");
      setData("");
      setDuplicate(null);
    } catch (error) {
      alert(error);
    }
  };

  const deleteFile = async (id) => {
    try {
      await DeleteFile(id);
    } catch (error) {
      alert(error);
    }
  }

  const checkDuplicate = (name) => {
    if (name) {
      files.find((file) =>
        file.filename === name ? setDuplicate(file.id) : setDuplicate(null)
      );
    }
  };

  const handleFileChange = (e) => {
    let form_data = new FormData();

    if (e.target.files[0]) {
      checkDuplicate(e.target.files[0].name);

      form_data.append("content", e.target.files[0]);
      form_data.append("filename", e.target.files[0].name);
      form_data.append("byte_size", e.target.files[0].size);

      setData(form_data);
    }
  };

  const handleFormAction = (e) => {
    e.preventDefault();

    const eventName = e.nativeEvent.submitter.name;

    switch (eventName) {
      case "upload":
        data ? uploadFile(e) : alert("Выберите файл");
        return;
      case "close":
        document.getElementById("content").value = "";
        document.getElementById("description").value = "";
        onHide();
        return;
      case "update_existed":
        deleteFile(duplicate);
        uploadFile(e)
        return;
      case "upload_copy":
        uploadFile(e);
        return;
    }
  };

  return (
    <form onSubmit={handleFormAction}>
      <br />
      {/* <button type="submit" name="close">
        <FontAwesomeIcon icon={faXmark} />
      </button> */}
      <br />
      <input
        type="file"
        id="content"
        name="content"
        onChange={(e) => {
          setContent(e.target.value);
          handleFileChange(e);
        }}
        value={content}
        placeholder="Выберите файл"
      />
      <br />
      <input
        type="text"
        id="description"
        name="description"
        placeholder="Описание"
        value={description}
        onChange={(e) => {
          setDescription(e.target.value);
        }}
      />
      <br />
      {duplicate ? (
        <>
          <span>Файл с данным именем уже хранится в МОХ</span>
          <input type="submit" name="update_existed" value="Заменить" />
          <input type="submit" name="upload_copy" value="Оставить оба" />
        </>
      ) : (
        <input type="submit" name="upload" value="Загрузить файл" />
      )}
    </form>
  );
}
