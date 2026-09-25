function TaskStats({ total, completed, pending }) {
  return (
    <div className="stats">
      <span>
        <strong>Total:</strong> {total}
      </span>

      <span>
        <strong>Completed:</strong> {completed}
      </span>

      <span>
        <strong>Pending:</strong> {pending}
      </span>
    </div>
  );
}

export default TaskStats;