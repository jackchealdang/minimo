// "use client"

import { useEffect, useState } from "react";
import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";

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
        {todos.map((todo) => (
            <div className="flex items-center space-x-2">
                <Checkbox id={`${todo.id}`} key={`c-${todo.id}`}/>
                <Badge className="bg-blue-500 font-bold">Important</Badge>
                <Label key={`l-${todo.id}`} htmlFor={`${todo.id}`}>{todo.title}</Label>
            </div>
        ))}
        </ScrollArea>
    </div>
  );
}
