import React from 'react'

export default function Todo({todo, toggleTodos}) {
  function handleToggleEvent() {
    toggleTodos(todo.id)
  }
  return (
    <div>
        <label>
            <input type="checkbox" checked={todo.completed} onChange={handleToggleEvent}/>
            {todo.name}
        </label>        
    </div>
  )
}
