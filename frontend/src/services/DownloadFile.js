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

export default downloadFile;
