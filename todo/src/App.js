import React, { useState, useEffect } from 'react';
import styles from './App.css';

function App() {
  const [todos , setTodos] = useState([])
  const [todo, setTodo] = useState('')
  const [todoEditing, setTodoEditing] = useState(null)
  const [editingText, setEditingText] = useState("")

  useEffect(() => {
    const temp = localStorage.getItem("todos")
    const loadedTodos = JSON.parse(temp)

    if(loadedTodos){
      setTodos(loadedTodos)
    }

  }, [])

  useEffect(() => {
    const temp = JSON.stringify(todos)
    localStorage.setItem("todos",temp)
  }, [todos])

  const handleSubmit = (e) => {
    e.preventDefault();
    
    const newTodo ={
      id:new Date().getTime(),
      text:todo,
      completed:false,
    }

    setTodos([...todos].concat(newTodo))
    setTodo('')
  }

  const deleteTodo = (id) => {
    const updatedTodos = [...todos].filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const toggleComplete = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.completed = !todo.completed
      }
      return todo 
    })
    setTodos(updatedTodos)
    
  }
  
  const editTodo = (id) => {
    const updatedTodos = [...todos].map((todo) => {
      if(todo.id === id){
        todo.text = editingText
      }
      return todo
    })

    setTodos(updatedTodos)
    setTodoEditing(null)
    setEditingText("")
  }
  return (
    <div id="todo-list">
      <h1>Todo List</h1>
      <form className={styles.form} onSubmit={handleSubmit}>
        <input type="text" onChange={(e) => setTodo(e.target.value)} value={todo} />
        <button type="submit">Add Todo</button>
      </form>

      {
        todos.map((todo) => {
          return <div key={todo.id} className ="todo-text">

          <input type="checkbox" id="completed" onChange={() => toggleComplete(todo.id)} checked={todo.completed}/>

          {todo.id === todoEditing ?
          (
            <input type="text" onChange={(e) => setEditingText(e.target.value)} value={editingText} />
          ):
          (
            <div>{todo.text}</div>
          )}
            <div className="todo-actions">
          {todo.id === todoEditing ? (
            <button onClick={() => editTodo(todo.id)}>Submit edit</button>
          ) : (
            <button onClick={() => setTodoEditing(todo.id)}>Edit Todo</button>
          )}

          <button onClick={() => deleteTodo(todo.id)}>Delete</button>
            </div>
          </div>
        })
      }
    </div>
  );
}

export default App;
