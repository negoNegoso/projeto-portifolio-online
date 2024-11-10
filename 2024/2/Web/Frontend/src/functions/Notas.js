import { Path } from "./Path";

export const getNotas = async (token) => {
  const result = await fetch(`${Path}/notas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const getNota = async (token, id) => {
  const result = await fetch(`${Path}/notas/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const postNota = async (token, data) => {
  const post = await fetch(`${Path}/notas/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await post.json();
  return result;
};

export const putNota = async (token, data, id) => {
  const put = await fetch(`${Path}/notas/${id}`, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  const result = await put.json();
  return result;
};

export const deleteNota = async (token, id) => {
  const del = await fetch(`${Path}/notas/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await del.json();
  return result;
};
