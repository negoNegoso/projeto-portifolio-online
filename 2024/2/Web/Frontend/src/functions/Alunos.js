import { Path } from "./Path";

export const getAlunos = async (token) => {
  const result = await fetch(`${Path}/alunos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const getAluno = async (token, id) => {
  const result = await fetch(`${Path}/alunos/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const postAluno = async (token, data) => {
  const post = await fetch(`${Path}/alunos/`, {
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

export const putAluno = async (token, data, id) => {
  const put = await fetch(`${Path}/alunos/${id}`, {
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

export const deleteAluno = async (token, id) => {
  const del = await fetch(`${Path}/alunos/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await del.json();
  return result;
};

export const loginAluno = async (data) => {
  const login = await fetch(`${Path}/alunos/login`, {
    method: "post",
    headers: {
      "Content-type": "application/json",
    },
    body: JSON.stringify(data),
  });

  const result = await login.json();
  return result;
};
