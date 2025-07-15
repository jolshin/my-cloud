import { useState, useEffect } from "react";
import api from "../api";
import File from "../components/File";
import "../styles/Home.css"; // Assuming you have a CSS file for styling
import fs from 'fs'; // Node.js file system module


function Home() {
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState("");
    //const [filename, setFilename] = useState("");
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
    }

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
            .get(`/api/files/download/${id}/`, { responseType: 'arraybuffer' })
            .then((res) => {
                console.log(res);
                // window.open(res.data.content, "download");
                const url = window.URL.createObjectURL(new Blob([res.data]))
                const link = document.createElement('a')
                link.href = url
                link.setAttribute('download', filename)
                document.body.appendChild(link)
                link.click()

            })
            .catch((error) => alert(error));
    }

    const uploadFile = (e) => {
        e.preventDefault();

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
            }).catch((error) => alert(error));

        }

    const handleFileChange = (e) => {
        let form_data = new FormData();

        form_data.append("content", e.target.files[0]);
        form_data.append("filename", e.target.files[0].name);

        setData(form_data);
    }


    return <div>
        <div>
            <h2>My Files</h2>
            {files.map((file) => <File file={file} key={file.id} onDownload={downloadFile} onDelete={deleteFile} />)}
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
                    handleFileChange(e);
                    setContent(e.target.value);
                }}
                value={content}
            />
            <br />
            <input type="submit" value="Upload File" />
            </form>
    </div>
}

export default Home;