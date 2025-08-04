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

export default deleteFile;
