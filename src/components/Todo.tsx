import { TodoType, Action, ACTIONS } from '../App'

interface TodoProps {
    index: number
    todo: TodoType
    handleToggle: (id: number) => void
    handleDelete: (id: number) => void
    handleUpdate: (id: number) => void
}

function Todo({ index, todo, handleToggle, handleDelete, handleUpdate }: TodoProps) {

    const showTodo = (todo: TodoType, index: number) => {
        return `${index + 1} ${todo.name} ${todo.status ? 'Completed' : 'Incomplete'}`
    }

    return (
        <>
            <div onDoubleClick={() => handleToggle(todo.id)} key={todo.id}>{showTodo(todo, index)}</div>
            <button onClick={() => handleDelete(todo.id)} >Delete</button>
            <button onClick={() => handleUpdate(todo.id)}>Update</button>
        </>
    )
}

export default Todo