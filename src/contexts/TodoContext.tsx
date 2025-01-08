import { createContext, useContext, useEffect, useState } from 'react';
import { toast } from 'sonner';

interface Todo {
    id: number;
    title: string;
    completed: boolean;
}

interface TodosContextProps {
    todos: Todo[];
    fetchTodos: () => void;
    createTodo: (title: string) => Promise<void>;
    // toggleTodo: (id: number, completed: boolean) => Promise<void>;
}

const TodosContext = createContext<TodosContextProps | undefined>(undefined);

export const TodosProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [todos, setTodos] = useState<Todo[]>([]);

    async function fetchTodos() {
        fetch("http://localhost:5000/todos")
        .then(response => response.json())
        .then(data => setTodos(data))
    }

    async function createTodo(title: string) {
        fetch('http://localhost:5000/createTodo', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                title: title,
            })
        })
        .then(response => response.json())
        .then(data => {
            setTodos((prev) => [...prev,...data]);
            console.log(data);
            toast("Todo created!", {
            })
        })
        .catch(error => {
            console.log(error);
            toast("Failed to create Todo!", {
            })
        })
    }

    // TODO: add toggleTodo

    useEffect(() => {
        fetchTodos();
    }, []);

    return (
        <TodosContext.Provider value={{ todos, fetchTodos, createTodo}}>
            {children}
        </TodosContext.Provider>
    );
}

export const useTodos = () => {
    const context = useContext(TodosContext);
    if (!context) {
        throw new Error('useTodos must be used within a TodosProvider');
    }
    return context;
}