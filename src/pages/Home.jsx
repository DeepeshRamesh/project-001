import { useState } from "react";
import TaskList from "../components/TaskList";
import { useTasks } from "../hooks/useTasks";

function Home() {
  const [count, setCount] = useState(0);
  const [newTask, setNewTask] = useState("");

  const {
    tasks,
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
    clearTasks,
  } = useTasks();

  return (
    <div>
      <h1>Counter: {count}</h1>

      {count > 5 && <p>You crossed 5!🔥</p>}
      {count < 0 && (
        <p style={{ color: "red" }}>Negative Value!!</p>
      )}

      <button onClick={() => setCount(count + 1)}>
        Increase
      </button>
      <button onClick={() => setCount(count - 1)}>
        Decrease
      </button>

      <hr />

      <h2>My Tasks</h2>

      <input
        type="text"
        placeholder="Enter the new task"
        value={newTask}
        onChange={(e) => setNewTask(e.target.value)}
      />

      <button
        onClick={() => {
          addTask(newTask);
          setNewTask("");
        }}
      >
        Add Task
      </button>

      <div style={{ margin: "16px 0" }}>
        <button onClick={() => setFilter("all")}>
          All
        </button>
        <button onClick={() => setFilter("active")}>
          Active
        </button>
        <button onClick={() => setFilter("completed")}>
          Completed
        </button>
      </div>

      <TaskList
        tasks={tasks}
        onDelete={deleteTask}
        onEdit={startEdit}
        editingIndex={editingId}
        editedText={editedText}
        setEditedText={setEditedText}
        onSave={saveEdit}
        onCancel={cancelEdit}
        onToggle={toggleTask}
      />

      <button onClick={clearTasks}>
        Clear All Tasks
      </button>
    </div>
  );
}

export default Home;