import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import {
  addTask,
  getTasks,
  deleteTask,
  toggleTaskStatus,
} from "../services/taskService";

import TaskForm from "../components/TaskForm";
import TaskList from "../components/TaskList";
import "../styles/dashboard.css";

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const [tasks, setTasks] = useState([]);

  // Load tasks when dashboard opens
  useEffect(() => {
    loadTasks();
  }, []);

  const loadTasks = async () => {
    const userTasks = await getTasks(currentUser.uid);
    setTasks(userTasks);
  };

  // Add task
  const handleAddTask = async (task) => {
    await addTask({
      ...task,
      userId: currentUser.uid,
    });

    loadTasks();
  };

  // Delete task
  const handleDeleteTask = async (id) => {
    await deleteTask(id);
    loadTasks();
  };

  // Complete task
  const handleToggleTask = async (task) => {
    await toggleTaskStatus(task.id, !task.completed);
    loadTasks();
  };

  // Logout
  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  // Dashboard statistics
  const completedTasks = tasks.filter((task) => task.completed).length;

  const highPriorityTasks = tasks.filter(
    (task) => task.priority === "High"
  ).length;

  const pendingTasks = tasks.filter((task) => !task.completed).length;

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

        {/* Add Task */}

        <TaskForm onAddTask={handleAddTask} />

        {/* Task List */}

        <TaskList
          tasks={tasks}
          onDelete={handleDeleteTask}
          onToggle={handleToggleTask}
        />
      </main>
    </div>
  );
}

export default Dashboard;