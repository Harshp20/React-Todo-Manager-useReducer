import { TodoType } from '../App'
import './Todo.scss'
import '../App.scss'

interface TodoProps {
    todo: TodoType
    handleToggle: (id: number) => void
    handleDelete: (id: number) => void
    handleUpdate: (id: number) => void
}

function Todo({ todo, handleToggle, handleDelete, handleUpdate }: TodoProps) {
    return (
        <div className={`todo ${todo.status ? 'complete' : ''}`}>
            <span onDoubleClick={() => handleToggle(todo.id)} key={todo.id}>{todo.name}</span>
            <button className='btn delete' onClick={() => handleDelete(todo.id)} >Delete</button>
            <button className='btn update' onClick={() => handleUpdate(todo.id)}>Edit</button>
        </div>
    )
}

export default Todo