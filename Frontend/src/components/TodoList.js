import React, { useState } from "react";
import { TaskState } from "./selectTaskState.js";

const TodoList = ({ todos, handleEdit, handleDelete, handleStatus }) => {
  return (
    <ul className="allTodos">
      {todos.map((t) => (
        <li className="singleTodo">
          <span className="todoText" key={t.id}>
            {t.todo}
          </span>
          <button onClick={() => handleEdit(t.id)}>Edit</button>
          <button onClick={() => handleDelete(t.id)}>Delete</button>
          <TaskState
            handleStatus={handleStatus}
            name={t.todo}
            dbValue={t.statusState}
          />
        </li>
      ))}
    </ul>
  );
};

export default TodoList;
