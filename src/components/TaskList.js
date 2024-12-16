import React, { useState } from "react";

function TaskList({ tasks, updateTask, deleteTask, toggleEditMode }) {
  const [currentEditText, setCurrentEditText] = useState("");

  const handleEditClick = (task) => {
    setCurrentEditText(task.text); 
    toggleEditMode(task.id);
  };

  const handleSaveClick = (task) => {
    if (currentEditText.trim()) {
      updateTask(task.id, currentEditText); 
    }
  };

  return (
    <ul>
      {tasks.map((task) => (
        <li key={task.id}>
          {task.isEditing ? (
            <>
              <input
                type="text"
                value={currentEditText}
                onChange={(e) => setCurrentEditText(e.target.value)}
              />
              <button onClick={() => handleSaveClick(task)}>Save</button>
            </>
          ) : (
            <>
              <span>{task.text}</span>
              <button onClick={() => handleEditClick(task)}>Edit</button>
            </>
          )}
          <button onClick={() => deleteTask(task.id)}>Delete</button>
        </li>
      ))}
    </ul>
  );
}

export default TaskList;
