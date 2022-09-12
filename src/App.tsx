import { useState, useReducer, useEffect, FormEvent } from 'react';
import './App.scss';
import Todo from './components/Todo'

export type TodoType = {
  id: number
  name: string
  status: boolean
}

export type Action = {
  type: string
  payload?: number | string
}

export enum ACTIONS {
  ADD = 'add',
  DELETE = 'delete',
  TOGGLE = 'toggle'
}

function App() {
  const [isAddNew, setIsAddNew] = useState(false)
  const [todoName, setTodoName] = useState('')
  const [editTodo, setEditTodo] = useState<null | number>(null)
  const [duplicateTodo, setDuplicateTodo] = useState(false)
  const [todoList, dispatch] = useReducer(reducer, initState())

  function initState() {
    if (localStorage.getItem('todo-list')) {
      return JSON.parse(localStorage.getItem('todo-list') as string)
    }
    return [] as TodoType[]
  }

  useEffect(() => {
    localStorage.setItem('todo-list', JSON.stringify(todoList))
  }, [todoList])

  function reducer(todoList: TodoType[], action: Action) {
    switch (action.type) {
      case ACTIONS.ADD:
        if (editTodo) {
          return todoList.map((todo) => {
            if (todo.id === editTodo) {
              setEditTodo(null)
              if (todo.status) {
                return { ...todo, name: action.payload as string, status: !todo.status }
              } else {
                return { ...todo, name: action.payload as string }
              }
            }
            return todo
          })
        }
        return [addTodo(action.payload as string), ...todoList]
      case ACTIONS.TOGGLE:
        return toggleTodo(todoList, action.payload as number)
      case ACTIONS.DELETE:
        return todoList.filter((todo) => todo.id !== action.payload)
    }
    return todoList
  }

  function addTodo(name: string) {
    return {
      id: Date.now(),
      name: name,
      status: false
    }
  }

  function toggleTodo(todoList: TodoType[], id: number) {
    return todoList.map((todo) => {
      if (todo.id === id) {
        return { ...todo, status: !todo.status }
      }
      else return todo
    })
  }

  const submitHandler = (e: FormEvent) => {
    e.preventDefault()
    if (todoName.trim() && !isDuplicateName()) {
      dispatch({ type: ACTIONS.ADD, payload: todoName.trim() })
      setTodoName('')
    }
  }

  const isDuplicateName = () => {
    return todoList.find((todo) => {
      if (todo.name === todoName.trim()) {
        setDuplicateTodo(true)
        setTimeout(() => setDuplicateTodo(false), 2000)
        return todo
      }
    })
  }

  const handleToggle = (id: number) => {
    dispatch({ type: ACTIONS.TOGGLE, payload: id })
  }

  const handleDelete = (id: number) => {
    dispatch({ type: ACTIONS.DELETE, payload: id })
    setEditTodo(null)
  }

  const handleUpdate = (id: number) => {
    setIsAddNew(true)
    setEditTodo(id)
    todoList.map((todo) => todo.id === id ? setTodoName(todo.name) : null)
  }

  const cancelEdit = () => {
    setEditTodo(null)
    setTodoName('')
  }

  const handleDone = () => {
    setEditTodo(null)
    setIsAddNew(!isAddNew)
    setTodoName('')
  }

  return (
    <div className="App">
      {!isAddNew && <button onClick={() => setIsAddNew(!isAddNew)} className="btn add_new">Add New +</button>}
      {isAddNew && <button onClick={handleDone} className="btn done">Done</button>}
      {isAddNew &&
        <form onSubmit={submitHandler}>
          <input type="text" placeholder='Add something...' value={todoName} onChange={(e) => setTodoName(e.target.value)} />
          <button onClick={submitHandler} className="btn add_new">{editTodo ? 'Update' : 'Add +'}</button>
          {editTodo && <button className="btn delete" onClick={cancelEdit}>Cancel</button>}
        </form>}
      <div className={`errorText ${duplicateTodo ? 'show' : ''}`}>Todo Already Exists</div>
      <div className="todo_list_container">
        {
          todoList.map((todo) =>
            <Todo
              key={todo.id}
              todo={todo}
              handleToggle={handleToggle}
              handleDelete={handleDelete}
              handleUpdate={handleUpdate}
            />
          )
        }
      </div>
    </div>
  );
}

export default App;
