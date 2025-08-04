  const getFiles = () => {
    api
      .get("/api/files/")
      .then((res) => res.data)
      .then((data) => {
        setFiles(data);
      })
      .catch((error) => alert(error));
  };