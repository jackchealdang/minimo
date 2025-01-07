import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { useQuery } from '@tanstack/react-query'
import { TodoSkeleton } from "../skeletons/TodoSkeleton";
import { Todo } from "@/ts/types";

async function fetchTodos() {
    const response = await fetch('http://localhost:5000/todos');

    return await response.json();
}

export default function TodoList() {
    const { isPending, error, data, isFetching } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos});

    if (isPending) return (
        <TodoSkeleton/>
    );

    if (error) return 'Failed to fetch data: ' + error.message;

    return (
        <div className="flex flex-col gap-y-2">
            {data.map((todo: Todo) => (
                <ContextMenu key={todo.id} modal={false}>
                        <ContextMenuTrigger className="">
                        <div className="flex items-center space-x-2">
                            <Checkbox id={`${todo.id}`} key={`c-${todo.id}`}/>
                            <Badge className="bg-blue-500 font-bold">Important</Badge>
                            <Label key={`l-${todo.id}`} htmlFor={`${todo.id}`}>{todo.title}</Label>
                        </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem>
                                Edit
                            </ContextMenuItem>
                            <ContextMenuItem className="text-red-600">
                                Delete
                            </ContextMenuItem>
                        </ContextMenuContent>
                </ContextMenu>
            ))}
        </div>
    )
}