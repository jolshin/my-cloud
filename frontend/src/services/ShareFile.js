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

export default shareFile;
