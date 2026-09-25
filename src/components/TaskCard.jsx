function TaskCard({ task, toggleTask, deleteTask }) {
  return (
    <div className="task-card">
      <div
        className={`task-title ${
          task.completed ? "completed" : ""
        }`}
      >
        {task.title}
      </div>

      <div className="task-actions">
        <button
          className="complete-btn"
          onClick={() => toggleTask(task.id)}
        >
          {task.completed ? "Undo" : "Complete"}
        </button>

        <button
          className="delete-btn"
          onClick={() => deleteTask(task.id)}
        >
          Delete
        </button>
      </div>
    </div>
  );
}

export default TaskCard;