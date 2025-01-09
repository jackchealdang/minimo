// "use client"

import { ScrollArea } from "../ui/scroll-area";
import TodoList from "./TodoList";

export default function Todo() {

    return (
    <div className="pt-4 pb-4 w-full h-[48rem] box-border">
        <ScrollArea className="rounded-md border p-4 w-full h-full">
            <TodoList/>
        </ScrollArea>
    </div>
  );
}
