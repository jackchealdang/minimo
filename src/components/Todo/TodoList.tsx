'use client'

import { Checkbox } from "../ui/checkbox";
import { Label } from "../ui/label";
import { Badge } from "../ui/badge";
import { ContextMenu, ContextMenuContent, ContextMenuItem, ContextMenuTrigger } from "../ui/context-menu";
import { useMutation, useQuery } from '@tanstack/react-query'
import { TodoSkeleton } from "../skeletons/TodoSkeleton";
import { Todo } from "@/ts/types";
import { useSupabase } from "@/contexts/SupabaseContext";
import { useQueryClient } from "@tanstack/react-query";
import { toast } from "sonner";

export default function TodoList() {
    const supabase = useSupabase();
    const { isPending, error, data } = useQuery({ queryKey: ['todos'], queryFn: fetchTodos, enabled: !!supabase.auth.getSession});
    const queryClient = useQueryClient();

    async function fetchTodos() {
        const { data } = await supabase.from('todo').select().order('id', { ascending: true})
        return data;
    }

    async function deleteTodo(id: number) {
        await supabase.from('todo').delete().eq('id', id);
    }

    async function toggleTodo(id: number, completed: boolean) {
        await supabase.from('todo').update({completed: !completed}).eq('id', id);
    }

    const toggleMutation = useMutation({
        mutationFn: ({id, completed}: {id: number, completed: boolean}) => toggleTodo(id, completed),
        onMutate: async ({id, completed}: {id: number, completed: boolean}) => {
            await queryClient.cancelQueries({queryKey: ['todos']});

            const previousTodos = queryClient.getQueryData(['todos']);

            queryClient.setQueryData(
                ['todos'],
                (oldTodos: Todo[] | undefined) => {
                    const test = oldTodos?.map((todo) => {
                        return todo.id === id ? {...todo, completed: !completed} : todo
                    }) || []
                    return test
                }
            );

            return { previousTodos };
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData(['todos'], context?.previousTodos);
            toast("Failed to update Todo!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
            toast("Todo updated!");
        }
    })

    const deleteMutation = useMutation({
        mutationFn: deleteTodo,
        onMutate: async (id: number) => {
            await queryClient.cancelQueries({queryKey: ['todos']});

            const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);

            queryClient.setQueryData(
                ['todos'],
                (oldTodos: Todo[] | undefined) => oldTodos?.filter((todo) => todo.id !== id) || []
            );

            return { previousTodos };
        },
        onError: (_err, _newTodo, context) => {
            queryClient.setQueryData(['todos'], context?.previousTodos);
            toast("Failed to delete Todo!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
            toast("Todo deleted!");
        }
    })

    const handleToggleTodo = (id: number, completed: boolean) => {
        toggleMutation.mutate({id, completed});
    }

    const handleDeleteTodo = (id: number) => {
        deleteMutation.mutate(id);
    };

    if (isPending) return (
        <TodoSkeleton/>
    );

    if (error) return 'Failed to fetch data: ' + error.message;

    return (
        <div className="flex flex-col gap-y-2">
            {data?.map((todo: Todo) => (
                <ContextMenu key={todo.id} modal={false}>
                        <ContextMenuTrigger className="">
                        <div className="flex items-center space-x-2">
                            <Checkbox id={`${todo.id}`} key={`c-${todo.id}`} checked={todo.completed} onCheckedChange={() => handleToggleTodo(todo.id, todo.completed)}/>
                            <Badge className={`${todo.completed ? 'bg-gray-500' : 'bg-blue-500'} font-bold`}>Important</Badge>
                            <Label key={`l-${todo.id}`} htmlFor={`${todo.id}`} className={`${todo.completed ? 'line-through text-gray-500' : ''}`}>{todo.title}</Label>
                        </div>
                        </ContextMenuTrigger>
                        <ContextMenuContent>
                            <ContextMenuItem>
                                Edit
                            </ContextMenuItem>
                            <ContextMenuItem className="text-red-600" onSelect={() => handleDeleteTodo(todo.id)}>
                                Delete
                            </ContextMenuItem>
                        </ContextMenuContent>
                </ContextMenu>
            ))}
        </div>
    )
}