import { useState,useEffect } from "react";
import TaskList from "../components/TaskList";

function Home(){
     
    const [count , setCount] = useState(0);

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [
            {id:Date.now(), text:"Learn React",completed:false},
            {id:Date.now() + 1, text:"Build Project-001",completed:false},
            {id:Date.now() +2, text:"Master State",completed:false},
        ];
    });
    const [newTask , setNewTask] = useState("");

    const [editingIndex, setEditingIndex] = useState(null);
    const [editedText,setEditedText] = useState("");

    const [filter, setFilter] = useState("all");

    useEffect(() => {
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim() === "")return;

        setTasks([...tasks,{id:Date.now(), text:newTask,completed:false}]); //updating array state(copy old tasks, add new,replace state)
        setNewTask(""); //resets the input after adding
    };

    const handleDeleteTask = (idToDelete) => {
        const updatedTasks = tasks.filter((task) => task.id !== idToDelete);
        setTasks(updatedTasks);
    };

    const handleEditTask = (id) => {
        const taskToEdit = tasks.find((task) => task.id === id);
        setEditingIndex(id);
        setEditedText(taskToEdit.text);
    };

    const handleSaveTask = () => {
        const updatedTasks = tasks.map((task) => 
            task.id === editingIndex ? {...task, text:editedText}: task);
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditedText("");
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditedText("");
    };

    const handleToggleComplete = (id) =>{
        const updatedTasks = tasks.map(
            (task) => task.id === id ? { ...task,completed: !task.completed} : task
        );

        setTasks(updatedTasks);
    }

    const filteredTasks = tasks.filter((task) =>{
        if (filter === "active") return !task.completed;
        if (filter === "completed") return task.completed;
        return true;
    });

    return (
        <div>
            <h1>Counter: {count}</h1>

            {count > 5 ? <p>You crossed 5!🔥</p>:null}
            {count < 0 && <p style={{color:"red"}}>Negative Value!!</p>}

            <button onClick={() => setCount(count + 1)}>Increase</button>
            <button onClick={() => setCount(count - 1)}>Decrease</button>

            <hr />

            <h2>My Tasks</h2>

            <input
                type="text"
                placeholder="Enter the new task"
                value ={newTask}
                onChange={(e) => setNewTask(e.target.value)} // controlled input
            />

            <button onClick={handleAddTask}>Add Task</button>

            <div style={{ margin: "16px 0"}}>
                <button onClick={() => setFilter("all")}>All</button>
                <button onClick={() => setFilter("active")}>Active</button>
                <button onClick={() => setFilter("completed")}>completed</button>
            </div>

            <ul>
                <TaskList 
                tasks={filteredTasks} 
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                editingIndex={editingIndex}
                editedText={editedText}
                setEditedText={setEditedText}
                onSave={handleSaveTask}
                onCancel={handleCancelEdit}
                onToggle={handleToggleComplete}
                />
            </ul>

            <button onClick={() => setTasks([])}>
                Clear All Tasks
            </button>

        </div>
    
    );
}

export default Home;