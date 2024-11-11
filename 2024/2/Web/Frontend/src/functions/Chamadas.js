import { Path } from "./Path";

export const getChamadas = async (token) => {
  const result = await fetch(`${Path}/chamadas`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const getChamada = async (token, id) => {
  const result = await fetch(`${Path}/chamadas/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const postChamada = async (token, data) => {
  const post = await fetch(`${Path}/chamadas/`, {
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

export const putChamada = async (token, data, id) => {
  const put = await fetch(`${Path}/chamadas/${id}`, {
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

export const deleteChamada = async (token, id) => {
  const del = await fetch(`${Path}/chamadas/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await del.json();
  return result;
};
