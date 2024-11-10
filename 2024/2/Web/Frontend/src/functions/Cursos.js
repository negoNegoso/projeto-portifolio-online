import { Path } from "./Path";

export const getCursos = async (token) => {
  const result = await fetch(`${Path}/cursos`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const getCurso = async (token, id) => {
  const result = await fetch(`${Path}/cursos/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const data = await result.json();
  return data;
};

export const postCurso = async (token, data) => {
  const post = await fetch(`${Path}/cursos/`, {
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

export const putCurso = async (token, data, id) => {
  const put = await fetch(`${Path}/cursos/${id}`, {
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

export const deleteCurso = async (token, id) => {
  const del = await fetch(`${Path}/cursos/${id}`, {
    method: "delete",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
  });

  const result = await del.json();
  return result;
};
