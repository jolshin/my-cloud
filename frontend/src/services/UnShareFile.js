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

export default unShareFile;
