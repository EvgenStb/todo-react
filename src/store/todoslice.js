import { createSlice } from "@reduxjs/toolkit";

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
  },
  reducers: {
    addTodo(state, action) {
        
        state.todos.push({
            id: new Date().toISOString(),
            text: action.payload.text,
            competed: false
        })
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter(todo => todo.id !== action.payload.id)
    },
    toggleTodoCompleted(state, action) {
      const toggledTodo = state.todos.find(todo => todo.id === action.payload.id)
      toggledTodo.competed = !toggledTodo.competed;
    },
  },
});

export const {addTodo,removeTodo,toggleTodoCompleted} = todoSlice.actions;

export default todoSlice.reducer;