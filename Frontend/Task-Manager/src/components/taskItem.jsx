export default function TaskItem({ task, deleteTask, updateStatus }) {
  return (
    <div className="task-item">
      <h3>{task.title}</h3>
      <p>Status: {task.status}</p>

      {/* 🔄 STATUS CHANGE */}
      <select
        value={task.status}
        onChange={(e) => updateStatus(task.id, e.target.value)}
      >
        <option value="todo">Todo</option>
        <option value="in-progress">In Progress</option>
        <option value="done">Done</option>
      </select>

      {/* 🗑 DELETE */}
      <button onClick={() => deleteTask(task.id)}>
        Delete
      </button>
    </div>
  );
}