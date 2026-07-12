"use client";

import React, { useState } from 'react';

function InputTodo({ setTodoList }: { setTodoList: React.Dispatch<React.SetStateAction<any[]>> }) {
    const [description, setDescription] = useState("");
    const [loading, setLoading] = useState(false);
    const onSubmitForm = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        try {
            const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/todos/';
            const body = { description };
            const response = await fetch(`${baseUrl}`, {
                method: "POST",
                headers: {
                    "Content-type": "application/json"
                },
                body: JSON.stringify(body)
            })
            const json = await response.json();
            if (!response.ok) {
                console.error(json.error || "Failed to add todo");
                return;
            }
            setTodoList((prevTodoList) => [...prevTodoList, json])
            setDescription("")
        } catch (error) {
            console.log(error);
        } finally {
            setLoading(false);
        }
    }
    return (
        <div className='flex flex-col items-center w-full'>
            <h1 className='text-[40px] font-semibold mb-10'>Todo App</h1>
            <form onSubmit={onSubmitForm} className='flex w-full justify-center items-center'>
                <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} className='w-[500px] border border-gray-400 rounded p-2' />
                <button disabled={loading} className='ml-2 border border-gray-400 rounded p-2 bg-green-500 text-white cursor-pointer px-4 hover:bg-green-600 disabled:bg-gray-400 disabled:cursor-not-allowed'>{loading ? "Adding..." : "Add"}</button>
            </form>
        </div>
    )
}

export default InputTodo;