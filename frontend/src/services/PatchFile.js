import api from "../api";

export default async function PatchFile(id, data) {
    
  const res = await api.patch(`/api/files/update/${id}/`, data);
  return res.data;
}
