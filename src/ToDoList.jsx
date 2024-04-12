import React, { useState } from 'react';

function ToDoList() {
    let  lab='';
  const [tasks, setTasks] = useState(["Eat Food", "Learn for lab"]);
  const [newTask, setNewTask] = useState("");
  const [movingIndex, setMovingIndex] = useState(null);

  function handleInputChange(event) {
    setNewTask(event.target.value);
  }

  function addTask() {
    if (newTask !== "") {
      setMovingIndex(tasks.length); // Set moving index to the last item
      setTimeout(() => {
        setTasks([...tasks, newTask]);
        setNewTask("");
        setMovingIndex(null); // Reset moving index after animation
      }, 500); // Adjust timing to match CSS transition duration
    } else {
      alert("You have to do something!!!");
    }
  }

  function deleteTask(index) {
    setMovingIndex(index); // Set moving index to the item being deleted
    setTimeout(() => {
      setTasks(tasks.filter((_, i) => i !== index));
      setMovingIndex(null); // Reset moving index after animation
    }, 500); // Adjust timing to match CSS transition duration
  }

  function moveTaskUp(index) {
    if (index > 0) {
      setMovingIndex(index);
      setTimeout(() => {
        const newTasks = [...tasks];
        [newTasks[index], newTasks[index - 1]] = [newTasks[index - 1], newTasks[index]];
        setTasks(newTasks);
        setMovingIndex(null);
      }, 500); // Adjust timing to match CSS transition duration
    }
  }

  function moveTaskDown(index) {
    if (index < tasks.length - 1) {
      setMovingIndex(index);
      setTimeout(() => {
        const newTasks = [...tasks];
        [newTasks[index], newTasks[index + 1]] = [newTasks[index + 1], newTasks[index]];
        setTasks(newTasks);
        setMovingIndex(null);
      }, 500); // Adjust timing to match CSS transition duration
    }
  }

  return (
    <div className="to-do-list">
      <h1> To-Do-List </h1>
      <div className="addSection">
        <input
          type="text"
          placeholder="Enter a task..."
          value={newTask}
          onChange={handleInputChange}
        />
        <button className="add-button" onClick={addTask}>➕</button>
      </div>
      <ol>
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`task-container ${movingIndex === index ? "moving" : ""}`}
          >
            <li>
              <span className="text">{task}</span>
              <button className="delete-button" onClick={() => deleteTask(index)}>✔️</button>
              <button className="move-button" onClick={() => moveTaskUp(index)}>👆</button>
              <button className="move-button" onClick={() => moveTaskDown(index)}>👇</button>
            </li>
          </div>
        ))}
      </ol>
    </div>
  );
}

export default ToDoList;
