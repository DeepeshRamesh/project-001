function TaskList({ 
  tasks,
  onDelete,
  onEdit,
  editingIndex,
  editedText,
  setEditedText,
  onSave,
  onCancel, 
}) {
  return (
    <ul>
      {tasks.map((task, index) => (
        <li style={{
          marginBottom: "8px",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          }}  key={index}
          >
            {editingIndex === index ? (
              <>
                <input value={editedText} onChange={(e)=>setEditedText(e.target.value)}/>
                <button onClick={onSave}>Save</button>
                <button onClick={onCancel}>Cancel</button>
              </>
          ) : (
              <>
                <span>{task}</span>
                <div>
                  <button onClick={() => onEdit(index)}>
                    Edit
                  </button>
                  <button className="delete-btn" onClick={() => onDelete(index)}>
                    Delete
                  </button>
                </div>
              </>
            )}
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
