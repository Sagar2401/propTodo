import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Todo } from "../todo";

const initialState: Todo[] = [];

const savedTodos = localStorage.getItem("todos");

const todosSlice = createSlice({
  name: "todos",
  initialState: savedTodos ? JSON.parse(savedTodos) : initialState,
  reducers: {
    // addTodo for adding a new todo
    addTodo: {
      reducer: (state, action: PayloadAction<Todo>) => {
        state.push(action.payload);
        localStorage.setItem("todos", JSON.stringify(state));
      },
      prepare: (data: Todo) => ({
        payload: {
          id: Math.random().toString(16).slice(2),
          task: data.task,
          completed: false,
        } as Todo,
      }),
    },

    // deleteTodo for deleting a todo
    deleteTodo: (state, action: PayloadAction<string>) => {
      const index = state.findIndex((todo: Todo) => todo.id === action.payload);
      state.splice(index, 1);
      localStorage.setItem("todos", JSON.stringify(state));
    },

    // updateTodo for updating a todo
    updateTodo: (state, action: PayloadAction<Todo>) => {
      const index = state.findIndex(
        (todo: Todo) => todo.id === action.payload.id
      );
      state[index].task = action.payload.task;
    },

    // updateTodoStatus for updating the status of a todo
    updateTodoStatus: (
      state,
      action: PayloadAction<{ completed: boolean; id: string }>
    ) => {
      const index = state.findIndex(
        (todo: Todo) => todo.id === action.payload.id
      );
      state[index].completed = action.payload.completed;
      localStorage.setItem("todos", JSON.stringify(state));
    },
  },
});

export const { addTodo, updateTodo, deleteTodo, updateTodoStatus } =
  todosSlice.actions;
export default todosSlice.reducer;
