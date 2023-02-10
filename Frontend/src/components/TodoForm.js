import React from "react";

const TodoForm = ({ handleSubmit, todo, setTodo, editId }) => {
  return (
    <form className="todoForm" onSubmit={handleSubmit}>
      <input
        type="text"
        value={todo}
        onChange={(e) => setTodo(e.target.value)}
      />
      <button className="addButton" type="submit">
        {" "}
        {editId ? "Edit" : "ADD +"}
      </button>
    </form>
  );
};

export default TodoForm;
