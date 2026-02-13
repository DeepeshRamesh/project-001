import { useState,useEffect } from "react";
import TaskList from "../components/TaskList";

function Home(){
     
    const [count , setCount] = useState(0);

    const [tasks, setTasks] = useState(() => {
        const savedTasks = localStorage.getItem("tasks");
        return savedTasks ? JSON.parse(savedTasks) : [
            "Learn React",
            "Build Project-001",
            "Master State",
        ];
    });
    const [newTask , setNewTask] = useState("");

    const handleAddTask = () => {
        if (newTask.trim() === "")return;

        setTasks([...tasks,newTask]); //updating array state(copy old tasks, add new,replace state)
        setNewTask(""); //resets the input after adding
    };

    const handleDeleteTask = (indexToDelete) => {
        const updatedTasks = tasks.filter((_, index) => index !== indexToDelete);
        setTasks(updatedTasks);
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
                <TaskList tasks={tasks} onDelete={handleDeleteTask} />
            </ul>
        </div>
    
    );
}

export default Home;