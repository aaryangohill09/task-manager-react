import { useEffect, useState } from "react";
import "./App.css";

import Header from "./components/Header";
import TaskForm from "./components/TaskForm";
import SearchBar from "./components/SearchBar";
import TaskStats from "./components/TaskStats";
import FilterButtons from "./components/FilterButtons";
import TaskCard from "./components/TaskCard";

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
    if (task.trim() === "") {
      return;
    }

    const newTask = {
      id: Date.now(),
      title: task.trim(),
      completed: false,
    };

    setTasks((previousTasks) => [
      ...previousTasks,
      newTask,
    ]);

    setTask("");
  };

  const toggleTask = (id) => {
    setTasks((previousTasks) =>
      previousTasks.map((item) =>
        item.id === id
          ? {
              ...item,
              completed: !item.completed,
            }
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

  const completedTasks = tasks.filter(
    (item) => item.completed
  ).length;

  const pendingTasks =
    tasks.length - completedTasks;

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

        <Header />

        <TaskForm
          task={task}
          setTask={setTask}
          addTask={addTask}
        />

        <SearchBar
          search={search}
          setSearch={setSearch}
        />

        <TaskStats
          total={tasks.length}
          completed={completedTasks}
          pending={pendingTasks}
        />

        <FilterButtons
          filter={filter}
          setFilter={setFilter}
        />

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
                <TaskCard
                  key={item.id}
                  task={item}
                  toggleTask={toggleTask}
                  deleteTask={deleteTask}
                />
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