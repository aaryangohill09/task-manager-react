function TaskForm({ task, setTask, addTask }) {
  return (
    <div className="task-form">
      <input
        className="task-input"
        type="text"
        placeholder="Enter a task..."
        value={task}
        onChange={(e) => setTask(e.target.value)}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            addTask();
          }
        }}
      />

      <button className="add-btn" onClick={addTask}>
        Add Task
      </button>
    </div>
  );
}

export default TaskForm;