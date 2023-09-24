import React from 'react'
import { useDispatch } from 'react-redux';
import { deleteTodos, completeToggle } from "../store/todoslice";

function TodoItem({id,title, completed}) {
  const dispatch = useDispatch();

  return (
    <li>
      <input
        type="checkbox"
        checked={completed}
        onChange={() => dispatch(completeToggle(id))}
      />
      <span>{title}</span>
      <span className="delete" onClick={() => dispatch(deleteTodos(id))}>
        &times;
      </span>
    </li>
  );
}

export default TodoItem

