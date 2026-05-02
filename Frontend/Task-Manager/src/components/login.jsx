import { useState } from "react";

export default function Login({ onLogin, onSignup, mode = "login" }) {
  const [isLogin, setIsLogin] = useState(mode === "login");

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = () => {
    if (!email || !password) {
      return alert("Please fill all fields");
    }

    if (isLogin) {
      onLogin(email, password);
    } else {
      if (!name) return alert("Name required");
      onSignup(name, email, password);
    }
  };

  return (
    <div
      style={{
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        background: "#f4f6f9"
      }}
    >
      <div
        style={{
          width: "350px",
          padding: "30px",
          borderRadius: "12px",
          background: "white",
          boxShadow: "0 10px 30px rgba(0,0,0,0.1)",
          textAlign: "center"
        }}
      >
        <h2 style={{ marginBottom: "20px" }}>
          {isLogin ? "Welcome Back 👋" : "Create Account 🚀"}
        </h2>

        {/* NAME (Signup only) */}
        {!isLogin && (
          <>
            <input
              placeholder="Name"
              value={name}
              onChange={(e) => setName(e.target.value)}
              style={inputStyle}
            />
            <br />
          </>
        )}

        {/* EMAIL */}
        <input
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          style={inputStyle}
        />
        <br />

        {/* PASSWORD */}
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={inputStyle}
        />
        <br />

        {/* BUTTON */}
        <button
          onClick={handleSubmit}
          style={{
            width: "100%",
            padding: "10px",
            borderRadius: "8px",
            border: "none",
            background: "#1368EC",
            color: "white",
            fontWeight: "600",
            cursor: "pointer",
            marginTop: "10px"
          }}
        >
          {isLogin ? "Login" : "Signup"}
        </button>

        {/* TOGGLE */}
        <p style={{ marginTop: "15px", fontSize: "14px" }}>
          {isLogin ? "Don't have an account?" : "Already have an account?"}
          <span
            onClick={() => setIsLogin(!isLogin)}
            style={{
              color: "#1368EC",
              marginLeft: "5px",
              cursor: "pointer",
              fontWeight: "600"
            }}
          >
            {isLogin ? "Signup" : "Login"}
          </span>
        </p>
      </div>
    </div>
  );
}

// 🔹 reusable input style
const inputStyle = {
  width: "100%",
  padding: "10px",
  marginBottom: "10px",
  borderRadius: "8px",
  border: "1px solid #ddd",
  outline: "none"
};