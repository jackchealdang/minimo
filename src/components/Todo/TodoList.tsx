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
        const { data } = await supabase.from('todo').select()
        return data;
    }

    async function deleteTodo(id: number) {
        await supabase.from('todo').delete().eq('id', id);
    }

    const mutation = useMutation({
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
            toast("Failed to create Todo!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
            toast("Todo deleted!");
        }
    })

    const handleDeleteTodo = (id: number) => {
        mutation.mutate(id);
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
                            <Checkbox id={`${todo.id}`} key={`c-${todo.id}`}/>
                            <Badge className="bg-blue-500 font-bold">Important</Badge>
                            <Label key={`l-${todo.id}`} htmlFor={`${todo.id}`}>{todo.title}</Label>
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