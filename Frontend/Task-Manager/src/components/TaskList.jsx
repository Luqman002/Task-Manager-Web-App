export default function TaskList({ tasks, deleteTask, updateStatus }) {
  return (
    <div className="task-list">
      {tasks.map((task) => (
        <div key={task.id} className="task-item">

          <div>
            <h3>{task.title}</h3>
            <p className={task.status}>{task.status}</p>
          </div>

          <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

            {/* ⏳ TODO */}
            {task.status !== "todo" && (
              <button
                onClick={() => updateStatus(task.id, "todo")}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#6b7280",
                  color: "white",
                  fontWeight: "500",
                  cursor: "pointer"
                }}
              >
                🔄 Todo
              </button>
            )}

            {/* ⏳ IN PROGRESS */}
            {task.status !== "in-progress" && (
              <button
                onClick={() => updateStatus(task.id, "in-progress")}
                style={{
                  padding: "6px 10px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#f59e0b",
                  color: "white",
                  fontWeight: "500",
                  cursor: "pointer"
                }}
              >
                ⏳ Progress
              </button>
            )}

            {/* ✅ DONE */}
            {task.status !== "done" && (
              <button
                onClick={() => updateStatus(task.id, "done")}
                style={{
                  padding: "6px 12px",
                  borderRadius: "8px",
                  border: "none",
                  background: "#16a34a",
                  color: "white",
                  fontWeight: "500",
                  cursor: "pointer",
                  transition: "0.2s ease"
                }}
                onMouseOver={(e) => e.target.style.background = "#15803d"}
                onMouseOut={(e) => e.target.style.background = "#16a34a"}
              >
                ✓ Done
              </button>
            )}

            {/* 🗑 DELETE */}
            <button
              onClick={() => deleteTask(task.id)}
              style={{
                padding: "6px 12px",
                borderRadius: "8px",
                border: "none",
                background: "#ef4444",
                color: "white",
                fontWeight: "500",
                cursor: "pointer",
                transition: "0.2s ease"
              }}
              onMouseOver={(e) => e.target.style.background = "#dc2626"}
              onMouseOut={(e) => e.target.style.background = "#ef4444"}
            >
              🗑 Delete
            </button>

          </div>

        </div>
      ))}
    </div>
  );
}