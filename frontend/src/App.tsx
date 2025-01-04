import {useEffect, useState} from 'react';

interface Todo {
  id: number;
  title: string;
  completed: boolean;
}

function App() {
  const [todos, setTodos] = useState<Todo[]>([])


  useEffect(() => {
    fetch('http://localhost:5000/todos')
    .then((res) => res.json())
    .then((data) => setTodos(data));

    console.log(todos);
  }, []);

  return (
    <div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id}>{todo.title}</li>
        ))}
      </ul>
    </div>
  );
}

export default App;