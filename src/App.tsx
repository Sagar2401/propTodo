import "./App.css";
import { Todo } from "./todo";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { AppDispatch } from "./store/store";
import TodoList from "./Components/TodoList";
import { addTodo, updateTodo } from "./model/todoSlice";
import Form from "./Components/Form";

function App() {
  // this state for save todo data
  const [todos, setTodos] = useState<Todo>({
    id: "",
    task: "",
    completed: false,
  });

  // this state for catch the error
  const [error, setError] = useState<boolean>(false);

  const dispatch = useDispatch<AppDispatch>();

  // function for handle submit for save the data
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!todos.task) {
      setError(true);
    } else {
      if (todos.id) {
        dispatch(updateTodo(todos));
        setTodos({ id: "", task: "", completed: false });
      } else {
        dispatch(addTodo(todos));
        setTodos({ id: "", task: "", completed: false });
      }
    }
  };

  // function for handle submit for update the data

  const handleUpdate = (todo: Todo) => {
    setTodos(todo);
  };

  return (
    <div className="App">
      <Form
        handleSubmit={handleSubmit}
        todos={todos}
        setTodos={setTodos}
        error={error}
        setError={setError}
      />
      <TodoList handleUpdate={handleUpdate} />
    </div>
  );
}

export default App;
