function FilterButtons({ filter, setFilter }) {
  return (
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
  );
}

export default FilterButtons;