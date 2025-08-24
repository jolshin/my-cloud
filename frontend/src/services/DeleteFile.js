import api from "../api";

export default async function DeleteFile(id) {
    
  const res = await api
        .delete(`/api/files/delete/${id}/`);
    return res.data;
}
