import { useRef, useState, useEffect } from 'react';
import TodoList from './TodoList';
import { v4 as uuidv4 } from 'uuid';

const LOCAL_STORAGE_KEY = 'todoApp.todos'

function App() {
  const [todos, setTodos] = useState([])
  const todoNameRef = useRef()

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY))
    if(storedTodos) setTodos(storedTodos)    
  }, [])

  useEffect(() => {
    localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(todos))
  }, [todos])

  function toggleTodos(id) {
    const newTodos = [...todos]
    const todo = newTodos.find(todo => todo.id === id)
    todo.completed = !todo.completed
    setTodos(newTodos)
  }

  function addTodo(e) {
    const name = todoNameRef.current.value;
    if(name === '') return
    setTodos(prevTodos => {
      return [...prevTodos, {id: uuidv4(), name: name, completed: false}]
    })
    todoNameRef.current.value = null
  }

  function clearTodos() {    
    const newTodos = todos.filter(todo => !todo.completed)
    setTodos(newTodos)
  }

  return (
    <>
      <TodoList todos={todos} toggleTodos={toggleTodos}/>
      <input type="text" ref={todoNameRef}/>
      <button onClick={addTodo}>Add Todo</button>
      <button onClick={clearTodos}>Clear Todo</button>
      <label>{todos.filter(todo => !todo.completed).length} left to do</label>
    </>
  )
}

export default App;
