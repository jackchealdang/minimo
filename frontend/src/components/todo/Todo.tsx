// "use client"

import { ScrollArea } from "../ui/scroll-area";
import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { useTodos } from "@/contexts/TodoContext";

interface Todo {
    id: number;
    created_at: string;
    title: string;
    completed: boolean;
}

export default function Todo() {
    const { todos } = useTodos();

    return (
    <div className="mt-4 mb-4">
        <ScrollArea className="rounded-md border p-4">
        <div className="flex flex-col gap-y-2">
            {todos.map((todo) => (
                <>
        <ContextMenu modal={false}>
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
                </>
            ))}
        </div>
        </ScrollArea>
    </div>
  );
}
