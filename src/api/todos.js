import api from "./client";

export const getTodos = () => api.get("/todos");

export const addTodoApi = (text) =>
  api.post("/todos", { text });

export const deleteTodoApi = (id) =>
  api.delete(`/todos/${id}`);

export const toggleTodoApi = (id) =>
  api.patch(`/todos/${id}/toggle`);

export const editTodoApi = (id, text) =>
  api.put(`/todos/${id}`, { text });
