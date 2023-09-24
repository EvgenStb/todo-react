import {useState,useEffect} from 'react'
import {useDispatch, useSelector} from "react-redux"

import { addNewTodo, fetchTodos } from "./store/todoslice";

import TodoList from './components/TodoList';
import ImputField from './components/ImputField';
import './App.css';

function App() {
  const [title, setTitle] = useState('')

  const {status, error} = useSelector(state => state.todos)

  const dispatch = useDispatch();
 
  useEffect(()=> {dispatch(fetchTodos())}, [dispatch])

const addTask = () => {
  dispatch(addNewTodo(title));
  setTitle("");
}

  return (
    <div className="App">
      <ImputField title={title} handleInput={setTitle} handleSubmit={addTask} />
      {status === "loading" && <h2>Loading</h2>}
      {error && <h2>An error occured:{error}</h2>}
      <TodoList />
    </div>
  );
}

export default App;
