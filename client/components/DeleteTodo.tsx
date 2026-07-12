import React, { useState } from 'react'

function DeleteTodo({ id, todoList, setTodoList }: { id: number, todoList: any[], setTodoList: React.Dispatch<React.SetStateAction<any[]>> }) {
    const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/todos/';
    const [loading, setLoading] = useState(false);
    const deleteTodo = async (id: number) => {
        setLoading(true)
        try {
            const res = await fetch(`${baseUrl}${id}`, {
                method: "DELETE",
            })
            const data = await res.json();
            if (!res.ok) {
                console.error(data.error || "Failed to delete todo");
                return;
            }
            setTodoList(todoList.filter((todo: any) => todo.todo_id !== id));
        } catch (error) {
            console.log(error)
        }
        finally {
            setLoading(false)
        }
    }
    return (
        <button disabled={loading} className='border border-gray-400 rounded p-2 bg-red-500 text-white cursor-pointer hover:bg-red-600 disabled:bg-gray-400 disabled:cursor-not-allowed px-2' onClick={() => deleteTodo(id)}>{loading ? "Deleting..." : "Delete"}</button>
    )
}

export default DeleteTodo;