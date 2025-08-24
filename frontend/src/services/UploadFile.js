import api from "../api";

export default async function UploadFile(data) {
  let axiosConfig = {
    headers: {
      "Content-Type": "multipart/form-data",
    },
  };

  const res = await api.post(`/api/files/`, data, axiosConfig);
  return res.data;
}
