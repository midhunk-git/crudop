import React, { useState, useEffect } from "react";
import TaskForm from "./components/TaskForm";
import TaskList from "./components/TaskList";

function App() {
  const [tasks, setTasks] = useState([]);
  const [showTasks, setShowTasks] = useState(true);

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);


  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = (task) => {
    const newTask = { id: Date.now(), text: task, isEditing: false };
    setTasks([...tasks, newTask]);
  };

  const updateTask = (id, updatedText) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, text: updatedText, isEditing: false } : task
      )
    );
  };

  const deleteTask = (id) => {
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const toggleEditMode = (id) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, isEditing: true } : { ...task, isEditing: false }
      )
    );
  };

  const toggleShowTasks = () => {
    setShowTasks(!showTasks);
  };

  return (
    <div>
      <h1>CRUD</h1>
      <TaskForm addTask={addTask} />
      <button className="toggle-button" onClick={toggleShowTasks}>
        {showTasks ? "Hide Tasks" : "Show Tasks"}
      </button>
      {showTasks && (
        <TaskList
          tasks={tasks}
          updateTask={updateTask}
          deleteTask={deleteTask}
          toggleEditMode={toggleEditMode}
        />
      )}
    </div>
  );
}

export default App;
