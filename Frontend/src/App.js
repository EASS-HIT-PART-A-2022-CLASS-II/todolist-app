import React, { useState, useEffect } from "react";
import TodoForm from "./components/TodoForm";
import TodoList from "./components/TodoList";
import axios from "axios";

const App = () => {
  const [todo, setTodo] = useState("");
  const [todos, setTodos] = useState([]);
  const [editId, setEditId] = useState(0);
  const [loading, setLoading] = useState(true);

  const loadAll = async () => {
    let tempTodos = [];
    let e = await axios.get(`http://127.0.0.1:8000/todos/get_all_todos`);
    let res = e.data.res;
    console.log(res);
    let result;
    for (let i = 0; i < res.length; i++) {
      result = res[i][1];
      tempTodos.push({
        id: `${res[i][1]}-${Date.now()}`,
        todo: result,
        statusState: res[i][2],
      });
    }
    console.log(tempTodos);
    setTodos(tempTodos);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };

  useEffect(() => {
    loadAll();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    if (editId) {
      let temp = editId.split("-")[0];
      axios.get(`http://127.0.0.1:8000/todos/editname/${temp}/${todo}`);
      const editTodo = todos.find((i) => i.id === editId);
      console.log(editId, editTodo, todo);
      const updatedTodos = todos.map((t) =>
        t.id === editTodo.id
          ? (t = { id: t.id, todo })
          : { id: t.id, todo: t.todo }
      );
      setTodos(updatedTodos);
      setEditId(0);
      setTodo("");
      return;
    } else {
      axios.get(`http://127.0.0.1:8000/todos/create_todo/${todo}/${"ToDo"}`);
    }

    if (todo !== "") {
      setTodos([...todos, { id: `${todo}-${Date.now()}`, todo }]);
      setTodo("");
    }
  };

  const handleDelete = (id) => {
    let idToDb = id.split("-")[0];
    axios.get(`http://127.0.0.1:8000/todos/delete/${idToDb}`);
    const delTodo = todos.filter((to) => to.id !== id);
    setTodos([...delTodo]);
  };

  const handleEdit = (id) => {
    const editTodo = todos.find((i) => i.id === id);
    setTodo(editTodo.todo);
    setEditId(id);
  };

  const handleStatus = (id, name) => {
    console.log(id);
    for (let i = 0; i < todos.length; i++) {
      if (todos[i].todo === name) {
        todos[i].statusState = id;
      }
    }
    axios.get(`http://127.0.0.1:8000/todos/statuschange/${id}/${name}`);
  };
  if (loading) {
    return (
      <div className="App">
        <div className="container">
          <h1>To Do List App</h1>
          <TodoForm
            handleSubmit={handleSubmit}
            todo={todo}
            setTodo={setTodo}
            editId={editId}
          />
          <h2>Please wait while loading</h2>
        </div>
      </div>
    );
  } else {
    return (
      <div className="App">
        <div className="container">
          <h1>To Do List App</h1>
          <TodoForm
            handleSubmit={handleSubmit}
            todo={todo}
            setTodo={setTodo}
            editId={editId}
          />
          <TodoList
            todos={todos}
            handleEdit={handleEdit}
            handleDelete={handleDelete}
            handleStatus={handleStatus}
          />
        </div>
      </div>
    );
  }
};

export default App;

//TODO: make todos useState save also the state of the status,
//Update add that also to every setTodos and also to your list rendering,
