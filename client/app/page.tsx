"use client";
import { useState, useEffect } from "react";
import InputTodo from "@/components/InputTodo";
import ListTodo from "@/components/ListTodo";
export default function Home() {
  const [todoList, setTodoList] = useState<any[]>([]);
  useEffect(() => {
    const getTodo = async () => {
      try {
        const baseUrl = process.env.NEXT_PUBLIC_API_BASE_URL || 'http://localhost:5000/todos/';
        const response = await fetch(`${baseUrl}`);
        const data = await response.json();
        setTodoList(data);
      } catch (error) {
        console.log(error);
      }
    }
    getTodo();
  }, [])
  return (

    <main className="w-screen h-screen max-h-screen flex flex-col items-center justify-start p-10">
      <InputTodo setTodoList={setTodoList} />
      <ListTodo todoList={todoList} setTodoList={setTodoList} />
    </main>

  );
}
