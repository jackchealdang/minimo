import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";

interface Todo {
    id: number;
    created_at: string;
    title: string;
    completed: boolean;
}

export default function Todo() {
    const [todos, setTodos] = useState<Todo[]>([])

    useEffect(() =>{
        fetch("http://localhost:5000/todos")
        .then(response => response.json())
        .then(data => setTodos(data))
    }, [])

    return (
    <div className="mt-4 mb-4">
        <ScrollArea className="rounded-md border p-4">
      <ul>
        {todos.map((todo) => (
            <li className='font-semibold' key={todo.id}>{todo.title}</li>
        ))}
      </ul>
        </ScrollArea>
    </div>
  );
}
