import { useState, useEffect } from "react";

export function useTasks() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks
      ? JSON.parse(savedTasks)
      : [
          { id: Date.now(), text: "Learn React", completed: false },
          { id: Date.now() + 1, text: "Build Project-001", completed: false },
          { id: Date.now() + 2, text: "Master State", completed: false },
        ];
  });

  const [editingId, setEditingId] = useState(null);
  const [editedText, setEditedText] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (text) => {
    if (!text.trim()) return;
    setTasks([
      ...tasks,
      { id: Date.now(), text, completed: false },
    ]);
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleTask = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id
          ? { ...task, completed: !task.completed }
          : task
      )
    );
  };

  const startEdit = (id) => {
    const task = tasks.find((t) => t.id === id);
    setEditingId(id);
    setEditedText(task.text);
  };

  const saveEdit = () => {
    setTasks(
      tasks.map((task) =>
        task.id === editingId
          ? { ...task, text: editedText }
          : task
      )
    );
    setEditingId(null);
    setEditedText("");
  };

  const cancelEdit = () => {
    setEditingId(null);
    setEditedText("");
  };

  const filteredTasks = tasks.filter((task) => {
    if (filter === "active") return !task.completed;
    if (filter === "completed") return task.completed;
    return true;
  });

  const totalTasks = tasks.length;
  const completedTasks = tasks.filter((task)=>task.completed).length;
  const activeTasks = totalTasks - completedTasks;

  const progress = totalTasks === 0 ? 0: Math.round((completedTasks / totalTasks)*100);

  const clearCompleted = () => {
    setTasks(tasks.filter((task)=>!task.completed));
  };

  return {
    tasks: filteredTasks,
    addTask,
    deleteTask,
    toggleTask,
    startEdit,
    saveEdit,
    cancelEdit,
    editingId,
    editedText,
    setEditedText,
    filter,
    setFilter,
    totalTasks,
    activeTasks,
    completedTasks,
    progress,
    clearCompleted,
  };
}