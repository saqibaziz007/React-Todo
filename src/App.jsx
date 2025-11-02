import { useState } from "react";
import "./App.css";

function Class06() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);
  const [search, setSearch] = useState("");

  function handleAdd() {
    if (newTodo.trim() === "") return;

    if (editId) {
      setTodos(
        todos.map((todo) =>
          todo.id === editId ? { ...todo, text: newTodo } : todo
        )
      );
      setNewTodo("");
      setEditId(null);
    } else {
      setTodos([...todos, { id: Date.now(), text: newTodo }]);
      setNewTodo("");
    }
  }

  function handleDelete(id) {
    setTodos(todos.filter((todo) => todo.id !== id));
  }

  function handleEdit(id) {
    const todo = todos.find((t) => t.id === id);
    setNewTodo(todo.text);
    setEditId(id);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") handleAdd();
  }

  const filteredTodos = todos.filter((todo) =>
    todo.text.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="app-container">
      <div className="todo-app">
        <header className="todo-header">
          <div className="header-top">
            <h1>Todo App</h1>
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search tasks..."
              className="search-input"
            />
          </div>
          <p>{editId ? "Edit your task" : "Add your daily tasks"}</p>
        </header>

        <section className="input-section">
          <div className="input-group">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your task..."
              className="todo-input"
            />
            <button onClick={handleAdd} className="add-btn">
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </section>

        <section className="todos-section">
          {filteredTodos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p>No tasks found.</p>
            </div>
          ) : (
            <div className="todos-list">
              {filteredTodos.map((todo) => (
                <div
                  key={todo.id}
                  className={`todo-item ${
                    editId === todo.id ? "editing" : ""
                  }`}
                >
                  <h3 className="todo-text">{todo.text}</h3>
                  <div className="todo-actions">
                    <button
                      onClick={() => handleEdit(todo.id)}
                      className="edit-btn"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => handleDelete(todo.id)}
                      className="delete-btn"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
    </div>
  );
}

export default Class06;