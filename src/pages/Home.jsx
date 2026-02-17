import { useState,useEffect } from "react";
import TaskList from "../components/TaskList";

function Home(){
     
    const [count , setCount] = useState(0);

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [
            {id:Date.now(), text:"Learn React"},
            {id:Date.now() + 1, text:"Build Project-001"},
            {id:Date.now() +2, text:"Master State"},
        ];
    });
    const [newTask , setNewTask] = useState("");

    const [editingIndex, setEditingIndex] = useState(null);
    const [editedText,setEditedText] = useState("");

    useEffect(() => {
        localStorage.setItem("tasks",JSON.stringify(tasks));
    }, [tasks]);

    const handleAddTask = () => {
        if (newTask.trim() === "")return;

        setTasks([...tasks,newTask]); //updating array state(copy old tasks, add new,replace state)
        setNewTask(""); //resets the input after adding
    };

    const handleDeleteTask = (indexToDelete) => {
        const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(updatedTasks);
    };

    const handleEditTask = (index) => {
        setEditingIndex(index);
        setEditedText(tasks[index]);
    };

    const handleSaveTask = () => {
        const updatedTasks = tasks.map((task, index) => 
            index === editingIndex ? editedText : task);
        setTasks(updatedTasks);
        setEditingIndex(null);
        setEditedText("");
    };

    const handleCancelEdit = () => {
        setEditingIndex(null);
        setEditedText("");
    };

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

            <ul>
                <TaskList 
                tasks={tasks} 
                onDelete={handleDeleteTask}
                onEdit={handleEditTask}
                editingIndex={editingIndex}
                editedText={editedText}
                setEditedText={setEditedText}
                onSave={handleSaveTask}
                onCancel={handleCancelEdit}
                />
            </ul>

            <button onClick={() => setTasks([])}>
                Clear All Tasks
            </button>

        </div>
    
    );
}

export default Home;