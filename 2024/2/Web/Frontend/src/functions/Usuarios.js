import { Path } from "./Path";

export const getUsuarios = async (token) => {
  const result = await fetch(`${Path}/usuarios`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const getUsuario = async (token, id) => {
  const result = await fetch(`${Path}/usuarios/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const postUsuario = async (token, data) => {
  const post = await fetch(`${Path}/usuarios/`, {
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

export const putUsuario = async (token, data, id) => {
  const put = await fetch(`${Path}/usuarios/${id}`, {
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

export const deleteUsuario = async (token, id) => {
  const del = await fetch(`${Path}/usuarios/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await del.json();
  return result;
};

export const loginUsuario = async (data) => {
  const login = await fetch(`${Path}/usuarios/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await login.json();
  return result;
};
