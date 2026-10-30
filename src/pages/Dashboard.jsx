
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import {
  addTask,
  getTasks,
  deleteTask,
  toggleTaskStatus,
  updateTask,
} from "../services/taskService";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/dashboard.css";

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");
  const [priorityFilter, setPriorityFilter] = useState("All");
  const [editingTask, setEditingTask] = useState(null);
  const [editTitle, setEditTitle] = useState("");
  const [editSubject, setEditSubject] = useState("");
  const [editPriority, setEditPriority] = useState("Medium");
  const [editDueDate, setEditDueDate] = useState("");
  const [editError, setEditError] = useState("");

  // Load tasks when dashboard opens
  useEffect(() => {
    if (currentUser?.uid) {
      loadTasks();
    }
  }, [currentUser?.uid]);

  const loadTasks = async () => {
    if (!currentUser?.uid) return;

    const userTasks = await getTasks(currentUser.uid);
    setTasks(userTasks);
  };

  // Add task
  const handleAddTask = async (task) => {
    await addTask({
      ...task,
      userId: currentUser.uid,
    });

    await loadTasks();
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    await loadTasks();
  };

  // Complete task
  const handleToggleTask = async (task) => {
    await toggleTaskStatus(task.id, !task.completed);
    await loadTasks();
  };

  // Open edit form
const handleEditTask = (task) => {
  setEditingTask(task);
  setEditTitle(task.title || "");
  setEditSubject(task.subject || "");
  setEditPriority(task.priority || "Medium");
  setEditDueDate(task.dueDate || "");
  setEditError("");
};

  // Save edited task
  const handleSaveEdit = async (event) => {
    event.preventDefault();

    const title = editTitle.trim();
    const subject = editSubject.trim();

    if (!title || !subject) {
      setEditError("Please enter both a task title and subject.");
      return;
    }

    try {
          await updateTask(editingTask.id, {
        title,
        subject,
        priority: editPriority,
        dueDate: editDueDate,
      });

      setEditingTask(null);
      setEditError("");
      await loadTasks();
    } catch (error) {
      console.error("Error updating task:", error);
      setEditError("Could not update the task. Please try again.");
    }
  };

  // Logout
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };
// Search tasks by title or subject


const filteredTasks = tasks.filter((task) => {
  const search = searchTerm.toLowerCase().trim();

  const matchesSearch =
    (task.title || "").toLowerCase().includes(search) ||
    (task.subject || "").toLowerCase().includes(search);

  const matchesStatus =
    statusFilter === "All" ||
    (statusFilter === "Pending" && !task.completed) ||
    (statusFilter === "Completed" && task.completed);

  const matchesPriority =
    priorityFilter === "All" ||
    task.priority === priorityFilter;

  return matchesSearch && matchesStatus && matchesPriority;
});
  // Dashboard statistics
  const completedTasks = tasks.filter((task) => task.completed).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

  const completionPercentage =
  tasks.length === 0
    ? 0
    : Math.round((completedTasks / tasks.length) * 100);
  return (
    <div className="dashboard">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2>🎓 Study Planner</h2>

        <ul>
          <li>🏠 Dashboard</li>
          <li>📚 Study Tasks</li>
          <li>📊 Progress</li>
        </ul>
      </aside>

      {/* Main */}
      <main className="main-content">
        <div className="header">
          <div>
            <h1>Dashboard</h1>
            <p className="user-email">{currentUser?.email}</p>
          </div>

          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        </div>

        {/* Welcome */}
        <div className="welcome-card">
          <h2>Welcome Back 👋</h2>
          <p>Track your assignments and study progress in one place.</p>
        </div>

        {/* Statistics */}
        <div className="stats-grid">
          <div className="stat-card">
            <h3>{tasks.length}</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>{completedTasks}</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>{highPriorityTasks}</h3>
            <p>High Priority</p>
          </div>

          <div className="stat-card">
            <h3>{pendingTasks}</h3>
            <p>Pending Tasks</p>
          </div>
        </div>

        
<div className="progress-card">
  <h2>Study Progress</h2>

  <div className="progress-info">
    <span>{completionPercentage}% Completed</span>
    <span>
      {completedTasks} of {tasks.length} tasks
    </span>
  </div>

  <div className="progress-bar">
    <div
      className="progress-fill"
      style={{ width: `${completionPercentage}%` }}
    ></div>
  </div>
</div>


        {/* Add Task */}
        <TaskForm onAddTask={handleAddTask} />

        {/* Edit Task Form */}
        {editingTask && (
          <div className="task-form">
            <h2>Edit Study Task</h2>

            <form onSubmit={handleSaveEdit}>
              <label htmlFor="edit-title">Task Title</label>
              <input
                id="edit-title"
                type="text"
                value={editTitle}
                onChange={(event) => setEditTitle(event.target.value)}
                placeholder="Enter task title"
              />

              <label htmlFor="edit-subject">Subject</label>
              <input
                id="edit-subject"
                type="text"
                value={editSubject}
                onChange={(event) => setEditSubject(event.target.value)}
                placeholder="Enter subject"
              />

              <label htmlFor="edit-priority">Priority</label>
              <select
                id="edit-priority"
                value={editPriority}
                onChange={(event) => setEditPriority(event.target.value)}
              >
                <option value="Low">Low</option>
                <option value="Medium">Medium</option>
                <option value="High">High</option>
              </select>

              <label htmlFor="edit-due-date">Due Date</label>
              <input
                id="edit-due-date"
                type="date"
                value={editDueDate}
                onChange={(event) => setEditDueDate(event.target.value)}
              />

              {editError && <p role="alert">{editError}</p>}

              <button type="submit">Save Changes</button>

              <button
                type="button"
                onClick={() => {
                  setEditingTask(null);
                  setEditError("");
                }}
              >
                Cancel
              </button>
            </form>
          </div>
        )}

{/* Search Tasks */}
<div className="task-search">
  <input
    type="text"
    placeholder="Search by task title or subject..."
    value={searchTerm}
    onChange={(event) => setSearchTerm(event.target.value)}
  />
</div>

{/* Filter by Status */}
<div className="task-filter">
  <label htmlFor="status-filter">Filter by status:</label>

  <select
    id="status-filter"
    value={statusFilter}
    onChange={(event) => setStatusFilter(event.target.value)}
  >
    <option value="All">All Tasks</option>
    <option value="Pending">Pending</option>
    <option value="Completed">Completed</option>
  </select>
</div>

{/* Filter by Priority */}
<div className="task-filter">
  <label htmlFor="priority-filter">Filter by priority:</label>

  <select
    id="priority-filter"
    value={priorityFilter}
    onChange={(event) => setPriorityFilter(event.target.value)}
  >
    <option value="All">All Priorities</option>
    <option value="High">High</option>
    <option value="Medium">Medium</option>
    <option value="Low">Low</option>
  </select>
</div>


{/* Task List */}
<TaskList
  tasks={filteredTasks}
  onDelete={handleDeleteTask}
  onToggle={handleToggleTask}
  onEdit={handleEditTask}
/>
      </main>
    </div>
  );
}

export default Dashboard;