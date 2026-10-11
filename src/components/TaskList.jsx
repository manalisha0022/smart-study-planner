
function TaskList({ tasks, onDelete, onToggle, onEdit }) {
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
          

{task.dueDate && (
  <p className="task-due-date">
    📅 Due: {task.dueDate}
  </p>
)}

{task.dueDate &&
  !task.completed &&
  task.dueDate <
    `${new Date().getFullYear()}-${String(
      new Date().getMonth() + 1
    ).padStart(2, "0")}-${String(
      new Date().getDate()
    ).padStart(2, "0")}` && (
    <p className="overdue-label">
      ⚠️ Overdue
    </p>
  )}



          <span className={`priority ${task.priority.toLowerCase()}`}>
            {task.priority}
          </span>

          <div className="task-actions">
            <button onClick={() => onToggle(task)}>
              {task.completed ? "✅ Completed" : "Mark Complete"}
            </button>

            <button onClick={() => onEdit(task)}>
              Edit
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