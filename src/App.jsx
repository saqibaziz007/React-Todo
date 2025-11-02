import { useState } from "react";
import "./App.css";

function CLass06() {
  const [todos, setTodos] = useState([]);
  const [newTodo, setNewTodo] = useState("");
  const [editId, setEditId] = useState(null);

  function handleAdd() {
    if (newTodo.trim() === "") return;
    
    if (editId) {
      setTodos(todos.map(todo => 
        todo.id === editId ? { ...todo, text: newTodo } : todo
      ));
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
    setEditId(id);
    let todo = todos.find((todo) => todo.id === id);
    setNewTodo(todo.text);
  }

  function handleKeyPress(e) {
    if (e.key === "Enter") {
      handleAdd();
    }
  }

  return (
    <div className="app-container">
      <div className="todo-app">
        <div className="todo-header">
          <h1>Todo App</h1>
          <p>{editId ? "Edit your task" : "Add your daily tasks"}</p>
        </div>

        <div className="input-section">
          <div className="input-group">
            <input
              type="text"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Enter your task..."
              className="todo-input"
            />
            <button 
              onClick={handleAdd}
              className="add-btn"
            >
              {editId ? "Update" : "Add"}
            </button>
          </div>
        </div>

        <div className="todos-section">
          {todos.length === 0 ? (
            <div className="empty-state">
              <div className="empty-icon">📝</div>
              <p>No tasks yet. Add one above!</p>
            </div>
          ) : (
            <div className="todos-list">
              {todos.map((todo) => (
                <div 
                  key={todo.id} 
                  className={`todo-item ${editId === todo.id ? 'editing' : ''}`}
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
        </div>
      </div>
    </div>
  );
}

export default CLass06;