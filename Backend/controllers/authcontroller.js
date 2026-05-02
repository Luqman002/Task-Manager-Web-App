const db = require("../config/db");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// ================= REGISTER =================
exports.register = (req, res) => {
  const { name, email, password } = req.body;

  console.log("📥 Incoming Data:", req.body);

  // ✅ Validation
  if (!name || !email || !password) {
    return res.status(400).json({
      message: "All fields are required",
    });
  }

  // ✅ Email validation
  const emailRegex = /^\S+@\S+\.\S+$/;
  if (!emailRegex.test(email)) {
    return res.status(400).json({
      message: "Invalid email format",
    });
  }

  try {
    const hashedPassword = bcrypt.hashSync(password, 10);

    const sql = "INSERT INTO users (name, email, password) VALUES (?, ?, ?)";

    db.query(sql, [name, email, hashedPassword], (err, result) => {
      if (err) {
        console.log("❌ REGISTER ERROR FULL:", err);

        if (err.code === "ER_DUP_ENTRY") {
          return res.status(400).json({
            message: "Email already exists",
          });
        }

        return res.status(500).json({
          message: err.message || "Signup failed",
        });
      }

      console.log("✅ User inserted ID:", result.insertId);

      res.status(201).json({
        message: "User registered successfully",
      });
    });
  } catch (error) {
    console.log("❌ HASH ERROR:", error);
    res.status(500).json({
      message: "Server error",
    });
  }
};

// ================= LOGIN =================
exports.login = (req, res) => {
  const { email, password } = req.body;

  console.log("🔐 Login attempt:", email);

  if (!email || !password) {
    return res.status(400).json({
      message: "Email and password required",
    });
  }

  const sql = "SELECT * FROM users WHERE email = ?";

  db.query(sql, [email], (err, results) => {
    if (err) {
      console.log("❌ LOGIN ERROR:", err);
      return res.status(500).json({ message: "Server error" });
    }

    if (results.length === 0) {
      return res.status(401).json({ message: "User not found" });
    }

    const user = results[0];

    const isMatch = bcrypt.compareSync(password, user.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Wrong password" });
    }

    const token = jwt.sign(
      { id: user.id, email: user.email },
      "secretkey",
      { expiresIn: "1d" }
    );

    console.log("✅ Login success:", user.email);

    res.json({
      token,
      user: {
        id: user.id,
        name: user.name,
        email: user.email,
      },
    });
  });
};