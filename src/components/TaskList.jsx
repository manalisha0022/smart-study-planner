function TaskList({ tasks, onDelete, onToggle }) {
  if (tasks.length === 0) {
    return <p>No study tasks yet.</p>;
  }

  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div
  className={`task-card ${task.completed ? "completed" : ""}`}
  key={task.id}
>
          <h3>{task.title}</h3>

          <p>{task.subject}</p>

          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          <div className="task-actions">
            <button onClick={() => onToggle(task)}>
              {task.completed ? "✅ Completed" : "Mark Complete"}
            </button>

            <button
              className="delete"
              onClick={() => onDelete(task.id)}
            >
              Delete
            </button>
          </div>
        </div>
      ))}
    </div>
  );
}

export default TaskList;