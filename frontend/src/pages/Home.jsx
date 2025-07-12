import { useState, useEffect } from "react";
import api from "../api";

function Home() {
    const [files, setFiles] = useState([]);
    const [content, setContent] = useState("");
    const [filename, setFilename] = useState("");

    useEffect(() => {
        getFiles();
    }, []);

    const getFiles = () => {
        api
            .get("/api/files/")
            .then((res) => res.data)
            .then((data) => {
                setFiles(data);
                console.log("Files fetched successfully:", data);
            })
            .catch((error) => alert(error));
    }
    return <div>Home</div>
}

export default Home;