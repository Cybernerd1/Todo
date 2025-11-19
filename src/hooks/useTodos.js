import { useState, useEffect } from "react";
import {
  getTodos,
  addTodoApi,
  deleteTodoApi,
  toggleTodoApi,
  editTodoApi,
} from "../api/todos";

export default function useTodos() {
  const [todos, setTodos] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadTodos();
  }, []);

  const loadTodos = async () => {
    try {
      setLoading(true);
      const res = await getTodos();
      setTodos(res.data);
    } catch (err) {
      console.log("Error:", err.message);
    } finally {
      setLoading(false);
    }
  };

  const addTodo = async (text) => {
    if (!text.trim()) return;
    const res = await addTodoApi(text);
    setTodos((prev) => [res.data, ...prev]);
  };

  const deleteTodo = async (id) => {
    await deleteTodoApi(id);
    setTodos((prev) => prev.filter((t) => t._id !== id));
  };

  const toggleComplete = async (id) => {
    const res = await toggleTodoApi(id);
    setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  const editTodo = async (id, text) => {
    const res = await editTodoApi(id, text);
    setTodos((prev) => prev.map((t) => (t._id === id ? res.data : t)));
  };

  return { todos, loading, addTodo, deleteTodo, toggleComplete, editTodo };
}
