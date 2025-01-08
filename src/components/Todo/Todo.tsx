// "use client"

import { ScrollArea } from "../ui/scroll-area";
import TodoList from "./TodoList";

export default function Todo() {

    return (
    <div className="mt-4 mb-4 max-h-full">
        <ScrollArea className="rounded-md border p-4 h-full max-h-full">
            <TodoList/>
        </ScrollArea>
    </div>
  );
}
