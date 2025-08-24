import api from "../api";

export default async function GetFiles(storageOwnerId) {
  const res = await api
        .get(`/api/user/store/${storageOwnerId}/`);
    return res.data;
}
