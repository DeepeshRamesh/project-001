import { motion, AnimatePresence } from "framer-motion";
function TaskList({ 
  tasks,
  onDelete,
  onEdit,
  editingIndex,
  editedText,
  setEditedText,
  onSave,
  onCancel,
  onToggle, 
}) {
  return (
    <ul>
      <AnimatePresence>
      {tasks.map((task) => (
        <motion.li
        initial ={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 10 }}
        transition={{ duration: 0.2 }}
         style={{
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          }}  key={task.id}
          >
            {editingIndex === task.id ? (
              <>
                <input value={editedText} onChange={(e)=>setEditedText(e.target.value)}/>
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
              </>
          ) : (
              <>
                <div style={{display: "flex", alignItems:"center"}}>
                  <input 
                  type="checkbox"
                  checked={task.completed}
                  onChange={() => onToggle(task.id)}
                  style={{ marginRight:"8px"}}
                  />
                  <span
                    style={{
                      testDecoration: task.completed ? "line-through" : "none",
                      opacity: task.completed ? 0.6 : 1,
                    }}
                  >
                    {task.text}
                  </span>
                </div>
                <div>
                  <button onClick={() => onEdit(task.id)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(task.id)}>
                    Delete
                  </button>
                </div>
              </>
            )}
        </motion.li>
      ))}
      </AnimatePresence>
    </ul>
  );
}

export default TaskList;
