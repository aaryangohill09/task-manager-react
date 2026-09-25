import { useEffect, useState } from "react";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState(() => {
    const savedTasks = localStorage.getItem("tasks");
    return savedTasks ? JSON.parse(savedTasks) : [];
  });

  const [task, setTask] = useState("");
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("all");

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  const addTask = () => {
    if (task.trim() === "") return;

    const newTask = {
      id: Date.now(),
      title: task.trim(),
      completed: false,
    };

    setTasks((previousTasks) => [...previousTasks, newTask]);
    setTask("");
  };

  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id
          ? { ...item, completed: !item.completed }
          : item
      )
    );
  };

  const deleteTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.filter((item) => item.id !== id)
    );
  };

  const clearCompleted = () => {
    setTasks((previousTasks) =>
      previousTasks.filter((item) => !item.completed)
    );
  };

  const completedTasks = tasks.filter((item) => item.completed).length;
  const pendingTasks = tasks.length - completedTasks;

  const filteredTasks = tasks.filter((item) => {
    const matchesFilter =
      filter === "all" ||
      (filter === "completed" && item.completed) ||
      (filter === "pending" && !item.completed);

    const matchesSearch = item.title
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchesFilter && matchesSearch;
  });

  return (
    <div className="app">
      <div className="container">

        <div className="header">
          <h1>Task Manager</h1>
          <p>Organize your tasks and stay productive.</p>
        </div>

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

        <div className="search-box">
          <input
            type="text"
            placeholder="Search tasks..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className="stats">
          <span>
            <strong>Total:</strong> {tasks.length}
          </span>

          <span>
            <strong>Completed:</strong> {completedTasks}
          </span>

          <span>
            <strong>Pending:</strong> {pendingTasks}
          </span>
        </div>

        <div className="filters">
          <button
            className={
              filter === "all"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("all")}
          >
            All
          </button>

          <button
            className={
              filter === "pending"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("pending")}
          >
            Pending
          </button>

          <button
            className={
              filter === "completed"
                ? "filter-btn active"
                : "filter-btn"
            }
            onClick={() => setFilter("completed")}
          >
            Completed
          </button>
        </div>

        {filteredTasks.length === 0 ? (
          <div className="empty">
            <h3>No tasks found</h3>
            <p>
              Try adding a new task or changing the filter.
            </p>
          </div>
        ) : (
          <>
            <div className="task-list">
              {filteredTasks.map((item) => (
                <div className="task-card" key={item.id}>

                  <div
                    className={`task-title ${
                      item.completed ? "completed" : ""
                    }`}
                  >
                    {item.title}
                  </div>

                  <div className="task-actions">

                    <button
                      className="complete-btn"
                      onClick={() => toggleTask(item.id)}
                    >
                      {item.completed ? "Undo" : "Complete"}
                    </button>

                    <button
                      className="delete-btn"
                      onClick={() => deleteTask(item.id)}
                    >
                      Delete
                    </button>

                  </div>
                </div>
              ))}
            </div>

            {completedTasks > 0 && (
              <button
                className="clear-btn"
                onClick={clearCompleted}
              >
                Clear Completed Tasks
              </button>
            )}
          </>
        )}

      </div>
    </div>
  );
}

export default App;