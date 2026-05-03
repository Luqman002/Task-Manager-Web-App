import { useEffect, useState } from "react";
import axios from "axios";

import Login from "./components/login";
import Navbar from "./components/navbar";
import StatsCard from "./components/statscard";
import TaskList from "./components/TaskList";

export default function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");
  const [showInput, setShowInput] = useState(false);

  // 👤 AUTH STATE
  const [user, setUser] = useState(() => {
    const token = localStorage.getItem("token");
    return token ? { token } : null;
  });

  // 👇 NEW (controls login/signup UI)
  const [authMode, setAuthMode] = useState(null); // "login" | "signup" | null

  const token = localStorage.getItem("token");
  const API = "https://task-manager-web-app-production-08bb.up.railway.app";
  // 🔄 FETCH TASKS
  useEffect(() => {
    if (user) fetchTasks();
  }, [user]);

  const fetchTasks = () => {
    axios
      .get(`${API}/api/tasks`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => setTasks(res.data))
      .catch((err) => console.log(err));
  };

  // ➕ ADD TASK
  const addTask = () => {
    if (!title.trim()) return;

    axios
      .post(
        `${API}/api/tasks`,
        { title },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => {
        setTitle("");
        setShowInput(false);
        fetchTasks();
      });
  };

  // 🗑 DELETE TASK
  const deleteTask = (id) => {
    axios
      .delete(`${API}/api/tasks/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then(() => fetchTasks());
  };

  // ✏️ UPDATE STATUS
  const updateStatus = (id, status) => {
    axios
      .put(
        `${API}/api/tasks/${id}`,
        { status },
        { headers: { Authorization: `Bearer ${token}` } }
      )
      .then(() => fetchTasks());
  };

  // 🔐 LOGIN
  const handleLogin = (email, password) => {
    axios
      .post(`${API}/api/auth/login`, { email, password })
      .then((res) => {
        localStorage.setItem("token", res.data.token);
        setUser({ token: res.data.token });
        setAuthMode(null); // close login
      })
      .catch((err) => {
  console.log("LOGIN ERROR:", err.response?.data);
  alert(err.response?.data?.message || "Login failed");
});
  };

  // 🆕 SIGNUP
  const handleSignup = (name, email, password) => {
  axios
    .post(`${API}/api/auth/register`, { // ✅ FIXED URL
      name,
      email,
      password,
    })
    .then((res) => {
      alert(res.data.message || "Signup successful");
      setAuthMode("login"); // switch to login
    })
    .catch((err) => {
      console.log("SIGNUP ERROR:", err.response?.data); // ✅ DEBUG
      alert(err.response?.data?.message || "Signup failed");
    });
};

  // 🚪 LOGOUT
  const handleLogout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setTasks([]);
    setShowInput(false);
  };

  return (
    <div>
      {/* 🧭 NAVBAR (NOW FULLY CONNECTED) */}
      <Navbar
        onNewTask={() => setShowInput((prev) => !prev)}
        isOpen={showInput}
        isLoggedIn={!!user}
        onLoginClick={() => setAuthMode("login")}
        onSignupClick={() => setAuthMode("signup")}
        onLogout={handleLogout}
      />

      {/* 🔐 AUTH UI */}
      {!user && authMode && (
        <Login
          mode={authMode} // login or signup
          onLogin={handleLogin}
          onSignup={handleSignup}
        />
      )}

      {/* 👇 HIDE APP IF NOT LOGGED IN */}
      {!user ? (
        <div style={{ textAlign: "center", marginTop: "50px" }}>
          <h2>Please Login or Signup</h2>
        </div>
      ) : (
        <>
          {/* ➕ ADD TASK UI */}
          {showInput && (
            <div
              style={{
                padding: "16px",
                margin: "20px auto",
                background: "white",
                borderRadius: "12px",
                boxShadow: "0 8px 24px rgba(0,0,0,0.08)",
                display: "flex",
                gap: "10px",
                alignItems: "center",
                maxWidth: "500px",
              }}
            >
              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="✨ Enter task..."
                style={{
                  flex: 1,
                  padding: "10px",
                  borderRadius: "8px",
                  border: "1px solid #ddd",
                }}
              />

              <button onClick={addTask}>➕ Add</button>
            </div>
          )}

          {/* 📊 STATS */}
          <div className="stats">
            <StatsCard title="Total" value={tasks.length} />
            <StatsCard title="Todo" value={tasks.filter(t => t.status === "todo").length} />
            <StatsCard title="In Progress" value={tasks.filter(t => t.status === "in-progress").length} />
            <StatsCard title="Done" value={tasks.filter(t => t.status === "done").length} />
          </div>

          {/* 📋 TASK LIST */}
          <TaskList
            tasks={tasks}
            deleteTask={deleteTask}
            updateStatus={updateStatus}
          />
        </>
      )}
    </div>
  );
}