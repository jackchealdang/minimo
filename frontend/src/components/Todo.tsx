import {useEffect, useState} from 'react';
import { ThemeProvider } from '@/components/theme-provider';
import {ModeToggle} from '@/components/mode-toggle';
import { Button } from '@/components/ui/button';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function Todo() {
  const [todos, setTodos] = useState<Todo[]>([])


  useEffect(() => {
    fetch('http://localhost:5000/todos')
    .then((res) => res.json())
    .then((data) => setTodos(data));

    console.log(todos);
  }, []);

  return (
    <ThemeProvider defaultTheme='dark' storageKey='vite-ui-theme'>
      <div>
        <ModeToggle></ModeToggle>
        <Button variant="outline">button</Button>
        <ul>
          {todos.map((todo) => (
            <li key={todo.id}>{todo.title}</li>
          ))}
        </ul>
      </div>
    </ThemeProvider>
  );
}

export default Todo;