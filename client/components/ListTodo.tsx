"use client";

import React, { useState, useEffect } from 'react';
import EditTodo from './EditTodo';
import DeleteTodo from './DeleteTodo';

function ListTodo({ todoList, setTodoList }: { todoList: any[], setTodoList: React.Dispatch<React.SetStateAction<any[]>> }) {
    return (
        <div className='flex flex-col items-center w-full mt-5'>
            <h1 className='text-[24px] md:text-[40px] font-semibold text-left w-full max-w-md'>List Todo</h1>
            {todoList.map((todo: any) => {
                return (
                    <div className='flex items-center justify-between w-full max-w-md border-b border-gray-200 p-2' key={todo.todo_id}>
                        <p>{todo.description}</p>

                        <div className='flex gap-2'>
                            <EditTodo todo={todo} setTodoList={setTodoList} />
                            <DeleteTodo id={todo.todo_id} todoList={todoList} setTodoList={setTodoList} />
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export default ListTodo;
