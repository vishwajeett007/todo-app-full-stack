import React, { useState } from 'react'

function EditTodo({ todo, setTodoList }: { todo: any, setTodoList: React.Dispatch<React.SetStateAction<any[]>> }) {
    const [description, setDescription] = useState(todo.description);
    const [isEditing, setIsEditing] = useState(false);
    const [loading, setLoading] = useState(false);
    const editTodo = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        if (!description.trim()) {
            setIsEditing(false);
            setLoading(false);
            return;
        }
        if (description === todo.description) {
            setIsEditing(false);
            setLoading(false);
            return;
        }
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/todos/';
            const res = await fetch(`${baseUrl}${todo.todo_id}`, {
                method: "PUT",
                headers: { "Content-type": "application/json" },
                body: JSON.stringify({ description })
            })
            const UpdatedTodo = await res.json();
            setTodoList(prev => prev.map(t => t.todo_id === todo.todo_id ? UpdatedTodo : t));
            setIsEditing(false);
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false);
        }
    }
    return (
        <>
            <button className='border border-gray-400 rounded p-2 bg-blue-500 text-white cursor-pointer hover:bg-blue-600 disabled:bg-gray-400 disabled:cursor-not-allowed' onClick={() => setIsEditing(true)}>Edit</button>
            {
                isEditing && (
                    <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
                        <div className="bg-white p-6 rounded shadow-lg w-[400px]">
                            <h2 className="text-2xl font-bold mb-4 text-black">Edit Todo</h2>
                            <form onSubmit={editTodo}>
                                <input
                                    type="text"
                                    className="w-full border border-gray-400 p-2 rounded mb-4 text-black"
                                    value={description}
                                    onChange={(e) => setDescription(e.target.value)}
                                />
                                <div className="flex justify-end gap-2">
                                    <button
                                        type="button"
                                        className="bg-gray-400 text-white px-4 py-2 rounded hover:bg-gray-500"
                                        onClick={() => {
                                            setDescription(todo.description);
                                            setIsEditing(false);
                                        }}
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600 disabled:bg-gray-400"
                                    >
                                        {loading ? "Saving..." : "Save"}
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                )}
        </>
    )
}

export default EditTodo;