import { createSlice, createAsyncThunk} from "@reduxjs/toolkit";

export const fetchTodos = createAsyncThunk(
  'todos/fetchTodos',
  async function(_,{rejectWithValue}){
    try {
      const response = await fetch ('https://jsonplaceholder.typicode.com/todos?_limit=10')
  
      const data = await response.json();
      if (!response.ok) {
        throw new Error('Server Error')
      }
      return data;
      
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

export const deleteTodos = createAsyncThunk(
  "todos/deleteTodos",
  async function(id, {rejectWithValue, dispatch}) {
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {method:'DELETE',}
      );

      if (!response.ok) {
        throw new Error('Can\'t delete task. Server Error ')
      };

      dispatch(removeTodo({id}));

    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const completeToggle = createAsyncThunk(
  "todos/completeToggle",
  async function (id, { rejectWithValue, dispatch, getState }) {
    const todo = getState().todos.todos.find((todo) => todo.id === id);
    try {
      const response = await fetch(
        `https://jsonplaceholder.typicode.com/todos/${id}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            completed: !todo.completed,
          }),
        }
      );
       
      if (!response.ok) {
        throw new Error("Can't toggle task. Server Error ");
      }
      const data = response.json()
      console.log(data)
       dispatch(toggleCompleted({ id }));
  
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

export const addNewTodo = createAsyncThunk(
  'todos/addNewTodo',
  async function (text, {rejectWithValue, dispatch}){
    try {
      const newTodo = {
        title: text,
        userId:1,
        completed: false,
      }

      const response = await fetch(
        "https://jsonplaceholder.typicode.com/todos", {
          method: 'POST',
          headers: {"Content-Type": "application/json"},
          body:JSON.stringify(newTodo),});

          if (!response.ok) {
            throw new Error("Can't create todo. Server Error ");
          }

      const data = await response.json()
      dispatch(addTodo(data));
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
)

const setError = (state, action) => {
      state.status = 'rejected';
      state.error = action.payload;}

const todoSlice = createSlice({
  name: "todo",
  initialState: {
    todos: [],
    status: null,
    error: null,
  },
  reducers: {
    addTodo(state, action) {
      state.todos.push(action.payload);
    },
    removeTodo(state, action) {
      state.todos = state.todos.filter((todo) => todo.id !== action.payload.id);
    },
    toggleCompleted(state, action) {
      const toggledTodo = state.todos.find(
        (todo) => todo.id === action.payload.id
      );
      toggledTodo.completed = !toggledTodo.completed;
    },
  },
  extraReducers: {
    [fetchTodos.pending]: (state) => {
      state.status = "loading";
      state.error = null;
    },
    [fetchTodos.fulfilled]: (state, action) => {
      state.status = "resolved";
      state.todos = action.payload;
    },
    [fetchTodos.rejected]: setError,
    [deleteTodos.rejected]: setError,
    [completeToggle.rejected]:setError,
  },
});

const {addTodo,removeTodo,toggleCompleted} = todoSlice.actions;

export default todoSlice.reducer;