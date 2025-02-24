import React, { useEffect, useState } from "react";
import { PlusCircle, Check, X, Trash2, Edit2 } from "lucide-react";
import "./App.css";

const App = () => {
  const BACKEND_HOST = import.meta.env.VITE_BACKEND_HOST;
  const BACKEND_PORT = import.meta.env.VITE_BACKEND_PORT;
  const BACKEND_URL = `http://${BACKEND_HOST}:${BACKEND_PORT}`;
  console.log(BACKEND_URL);

  const [tasks, setTasks] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingTask, setEditingTask] = useState(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    completed: false,
  });

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await fetch(`${BACKEND_URL}/tasks`);
      const data = await response.json();
      setTasks(data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const url = editingTask
        ? `${BACKEND_URL}/tasks/${editingTask.id}`
        : `${BACKEND_URL}/tasks`;
      const method = editingTask ? "PUT" : "POST";

      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) throw new Error("Failed to save task");

      await fetchTasks();
      setIsModalOpen(false);
      setEditingTask(null);
      setFormData({ title: "", description: "", completed: false });
    } catch (error) {
      console.error("Error saving task:", error);
    }
  };

  const handleDelete = async (id) => {
    try {
      await fetch(`${BACKEND_URL}/tasks/${id}`, {
        method: "DELETE",
      });
      await fetchTasks();
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const startEdit = (task) => {
    setEditingTask(task);
    setFormData({
      title: task.title,
      description: task.description,
      completed: task.completed,
    });
    setIsModalOpen(true);
  };

  return (
    <div className="container">
      <div className="header">
        <h1>Task Manager</h1>
        <button
          className="btn btn-primary"
          onClick={() => setIsModalOpen(true)}
        >
          <PlusCircle size={20} />
          Add Task
        </button>
      </div>

      <div className="task-grid">
        {tasks.map((task) => (
          <div key={task.id} className="task-card">
            <div className="task-header">
              <div>
                <h2 className="task-title">{task.title}</h2>
                <p className="task-description">{task.description}</p>
                <span
                  className={`task-status ${
                    task.completed ? "status-completed" : "status-pending"
                  }`}
                >
                  {task.completed ? "Completed" : "In Progress"}
                </span>
              </div>
              <div>
                <button className="icon-btn" onClick={() => startEdit(task)}>
                  <Edit2 size={20} />
                </button>
                <button
                  className="icon-btn delete-btn"
                  onClick={() => handleDelete(task.id)}
                >
                  <Trash2 size={20} />
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {isModalOpen && (
        <div className="modal-overlay">
          <div className="modal">
            <div className="modal-header">
              <h2 className="modal-title">
                {editingTask ? "Edit Task" : "Add New Task"}
              </h2>
              <button
                className="close-btn"
                onClick={() => {
                  setIsModalOpen(false);
                  setEditingTask(null);
                  setFormData({ title: "", description: "", completed: false });
                }}
              >
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label className="form-label">Title</label>
                <input
                  type="text"
                  className="form-input"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData({ ...formData, title: e.target.value })
                  }
                  required
                />
              </div>

              <div className="form-group">
                <label className="form-label">Description</label>
                <textarea
                  className="form-textarea"
                  value={formData.description}
                  onChange={(e) =>
                    setFormData({ ...formData, description: e.target.value })
                  }
                  required
                />
              </div>

              <div className="checkbox-group">
                <input
                  type="checkbox"
                  id="completed"
                  className="form-checkbox"
                  checked={formData.completed}
                  onChange={(e) =>
                    setFormData({ ...formData, completed: e.target.checked })
                  }
                />
                <label htmlFor="completed">Mark as completed</label>
              </div>

              <div className="form-actions">
                <button
                  type="button"
                  className="btn btn-secondary"
                  onClick={() => {
                    setIsModalOpen(false);
                    setEditingTask(null);
                    setFormData({
                      title: "",
                      description: "",
                      completed: false,
                    });
                  }}
                >
                  Cancel
                </button>
                <button type="submit" className="btn btn-primary">
                  <Check size={20} />
                  {editingTask ? "Update Task" : "Add Task"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default App;
