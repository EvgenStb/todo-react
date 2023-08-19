import React from 'react'
import TodoItem from './TodoItem';

function TodoList({ todos, removeTodo, toggleTodoCompleted }) {
  return (
    <ul>
      {todos.map((todo) => { return (
        <TodoItem
          key={todo.id}
          {...todo}
          removeTodo={removeTodo}
          toggleTodoCompleted={toggleTodoCompleted}
        />
      );
      })}
    </ul>
  );
}

export default TodoList;
