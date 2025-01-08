'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { Todo } from '@/ts/types'
import { toast } from 'sonner'

interface Props {
    closeParentDialog?: () => void;
}

const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters',
    }).max(50, {
        message: 'Title must be less than 50 characters',
    }),
})

async function createTodo(title: string) {
    const response = await fetch('http://localhost:5000/createTodo', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({
            title: title,
        })
    });
    return await response.json();
}

export function CreateTodoForm({closeParentDialog}: Props) {
    const queryClient = useQueryClient();
    const mutation = useMutation({
        mutationFn: createTodo,
        onMutate: async (newTodo) => {
            await queryClient.cancelQueries({queryKey: ['todos']});

            const previousTodos = queryClient.getQueryData<Todo[]>(['todos']);
            const temporaryId = Math.random();

            const optimisticTodo: Todo = {
                id: temporaryId,
                created_at: new Date().toISOString(),
                title: newTodo,
                completed: false,
            }

            queryClient.setQueryData<Todo[]>(['todos'], (old) => [...old, optimisticTodo]);

            return { previousTodos };
        },
        onError: (err, newTodo, context) => {
            queryClient.setQueryData(['todos'], context?.previousTodos);
            toast("Failed to create Todo!");
        },
        onSettled: () => {
            queryClient.invalidateQueries({queryKey: ['todos']});
            toast("Todo created!");
        }
    })

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        mutation.mutate(values.title);

        if (typeof closeParentDialog === 'function') closeParentDialog();
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className='space-y-8'>
                <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Title</FormLabel>
                            <FormControl>
                                <Input placeholder="Exercise for 30 minutes" {...field} />
                            </FormControl>
                            {/* <FormDescription>Give a title for your Todo!</FormDescription> */}
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Create</Button>
            </form>
        </Form>
    )
}