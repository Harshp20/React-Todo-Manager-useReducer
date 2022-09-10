import { TodoType } from '../App'
import './Todo.scss'

interface TodoProps {
    todo: TodoType
    handleToggle: (id: number) => void
    handleDelete: (id: number) => void
    handleUpdate: (id: number) => void
}

function Todo({ todo, handleToggle, handleDelete, handleUpdate }: TodoProps) {

    const showTodo = (todo: TodoType, index: number) => {
        return ``
    }

    return (
        <div className={`todo ${todo.status ? 'complete' : 'incomplete'}`}>
            <span onDoubleClick={() => handleToggle(todo.id)} key={todo.id}>{todo.name}</span>
            <button onClick={() => handleDelete(todo.id)} >Delete</button>
            <button onClick={() => handleUpdate(todo.id)}>Update</button>
        </div>
    )
}

export default Todo