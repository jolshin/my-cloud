import { useState, useEffect } from "react";
import api, { shareApi } from "../api";
import File from "../components/File";
import "../styles/Home.css"; // Assuming you have a CSS file for styling

function Home() {
  const [files, setFiles] = useState([]);
  const [content, setContent] = useState("");
  const [description, setDescription] = useState("");
  const [data, setData] = useState("");

  useEffect(() => {
    getFiles();
  }, []);

  const getFiles = () => {
    api
      .get("/api/files/")
      .then((res) => res.data)
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => alert(error));
  };

  const deleteFile = (id) => {
    api
      .delete(`/api/files/delete/${id}/`)
      .then((res) => {
        if (res.status === 204) alert("File deleted successfully");
        else alert("Failed to delete file");
        getFiles();
      })
      .catch((error) => alert(error));
  };

  const downloadFile = (id, filename) => {
    api
      .get(`/api/files/download/${id}/`, { responseType: "arraybuffer" })
      .then((res) => {
        const url = window.URL.createObjectURL(new Blob([res.data]));
        const link = document.createElement("a");
        link.href = url;
        link.setAttribute("download", filename);
        document.body.appendChild(link);
        link.click();

        api
          .patch(`/api/files/download/${id}/`, { last_downloaded: Date.now })
          .then((res) => {
            if (res.status === 200) alert("Date updated successfully");
            else alert("Failed to update date");
            getFiles();
          })
          .catch((error) => alert(error));
      })
      .catch((error) => alert(error));
  };

  const uploadFile = (e) => {
    e.preventDefault();

    setData((prevData) => {
      prevData.append("description", description);
      return prevData;
    });

    let axiosConfig = {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    };

    api
      .post("/api/files/", data, axiosConfig)
      .then((res) => {
        if (res.status === 201) alert("File uploaded successfully");
        else alert("Failed to upload file");
        getFiles();
        setContent("");
        setDescription("");
        setData("");
      })
      .catch((error) => alert(error));
  };

  const handleFileChange = (e) => {
    let form_data = new FormData();

    form_data.append("content", e.target.files[0]);
    form_data.append("filename", e.target.files[0].name);
    form_data.append("size", e.target.files[0].size);

    setData(form_data);
  };

  const shareFile = (id) => {
    api
      .patch(`/api/files/update/${id}`, {
        share_link: `${import.meta.env.VITE_HOST_URL}/share/${id}/`,
      })
      .then((res) => {
        if (res.status === 200) alert("File sharing is active");
        else alert("Failed to share file");
        getFiles();
      })
      .catch((error) => alert(error));
  };

  const unShareFile = (id) => {
    api
      .patch(`/api/files/update/${id}`, { share_link: null })
      .then((res) => {
        if (res.status === 200) alert("File sharing is inactive");
        else alert("Failed to unshare file");
        getFiles();
      })
      .catch((error) => alert(error));
  };

  return (
    <div>
      <div>
        <h2>My Files</h2>
        {files.map((file) => (
          <File
            file={file}
            key={file.id}
            onDownload={downloadFile}
            onDelete={deleteFile}
            onShare={shareFile}
            unShare={unShareFile}
          />
        ))}
      </div>
      <h2>Upload a File</h2>
      <form onSubmit={uploadFile}>
        <label htmlFor="filename">File:</label>
        <br />
        <input
          type="file"
          id="content"
          name="content"
          required
          onChange={(e) => {
            setContent(e.target.value);
            handleFileChange(e);
          }}
          value={content}
        />
        <br />
        <input type="text" id="description" name="description" 
          placeholder="Description"
          value={description}
          onChange={(e) => {
          setDescription(e.target.value);
          
        }}/>
        <br />
        <input type="submit" value="Upload File" />
      </form>
    </div>
  );
}

export default Home;
