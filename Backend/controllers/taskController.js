exports.getTasks = (req, res) => {
  req.db.query("SELECT * FROM tasks", (err, results) => {
    if (err) return res.status(500).send(err);
    res.json(results);
  });
};

exports.createTask = (req, res) => {
  const { title } = req.body;

  req.db.query(
    "INSERT INTO tasks (title, status) VALUES (?, 'todo')",
    [title],
    (err, result) => {
      if (err) return res.status(500).send(err);
      res.json({ id: result.insertId, title, status: "todo" });
    }
  );
};

exports.updateTask = (req, res) => {
  const { status } = req.body;

  req.db.query(
    "UPDATE tasks SET status=? WHERE id=?",
    [status, req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Task updated" });
    }
  );
};

exports.deleteTask = (req, res) => {
  req.db.query(
    "DELETE FROM tasks WHERE id=?",
    [req.params.id],
    (err) => {
      if (err) return res.status(500).send(err);
      res.json({ message: "Task deleted" });
    }
  );
};