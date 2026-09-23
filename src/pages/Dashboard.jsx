import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { logoutUser } from "../services/authService";
import "../styles/dashboard.css";

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleLogout = async () => {
    await logoutUser();
    navigate("/login");
  };

  return (
    <div className="dashboard">

      {/* Sidebar */}

      <aside className="sidebar">
        <h2>🎓 Study Planner</h2>

        <ul>
          <li>🏠 Dashboard</li>
          <li>📚 My Subjects</li>
          <li>✅ Study Tasks</li>
          <li>📅 Schedule</li>
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

        <div className="welcome-card">
          <h2>Welcome Back 👋</h2>

          <p>
            Organize your assignments, study schedule, and deadlines in one
            place.
          </p>
        </div>

        <div className="stats-grid">

          <div className="stat-card">
            <h3>12</h3>
            <p>Total Tasks</p>
          </div>

          <div className="stat-card">
            <h3>5</h3>
            <p>Completed</p>
          </div>

          <div className="stat-card">
            <h3>3</h3>
            <p>High Priority</p>
          </div>

          <div className="stat-card">
            <h3>2</h3>
            <p>Due Today</p>
          </div>

        </div>

      </main>

    </div>
  );
}

export default Dashboard;