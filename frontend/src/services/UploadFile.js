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
    })
    .catch((error) => alert(error));
};

export default uploadFile;
