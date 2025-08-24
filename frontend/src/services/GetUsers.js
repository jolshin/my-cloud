import api from "../api";

export default async function GetUsers() {
  const res = await api
        .get(`/api/users`);
    return res.data;
}