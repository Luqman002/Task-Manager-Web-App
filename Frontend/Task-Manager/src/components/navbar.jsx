export default function Navbar({
  onNewTask,
  isOpen,
  isLoggedIn,
  onLoginClick,
  onSignupClick,
  onLogout
}) {
  return (
    <div className="navbar">
      <h1>Task Manager</h1>

      <div style={{ display: "flex", gap: "10px", alignItems: "center" }}>

        {/* ➕ TASK BUTTON */}
        {isLoggedIn && (
          <button
            onClick={() => {
              console.log("New Task Clicked");
              onNewTask && onNewTask();
            }}
          >
            {isOpen ? "✖ Close" : "+ New Task"}
          </button>
        )}

        {/* 🔐 AUTH BUTTONS */}
        {!isLoggedIn ? (
          <>
            <button
              onClick={() => {
                console.log("Login Clicked");
                onLoginClick && onLoginClick();
              }}
              style={{
                background: "#1368EC",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Login
            </button>

            <button
              onClick={() => {
                console.log("Signup Clicked");
                onSignupClick && onSignupClick();
              }}
              style={{
                background: "black",
                color: "white",
                padding: "6px 12px",
                borderRadius: "6px",
                border: "none",
                cursor: "pointer"
              }}
            >
              Signup
            </button>
          </>
        ) : (
          <button
            onClick={() => {
              console.log("Logout Clicked");
              onLogout && onLogout();
            }}
            style={{
              background: "red",
              color: "white",
              padding: "6px 12px",
              borderRadius: "6px",
              border: "none",
              cursor: "pointer"
            }}
          >
            Logout
          </button>
        )}

      </div>
    </div>
  );
}