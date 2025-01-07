'use client'

import { zodResolver } from '@hookform/resolvers/zod'
import { useForm } from 'react-hook-form'
import { string, z } from 'zod'
import { Form, FormControl, FormDescription, FormField, FormItem, FormLabel, FormMessage } from '../ui/form'
import { Input } from '../ui/input'
import { Button } from '../ui/button'
import { toast } from 'sonner'
import { useTodos } from '@/contexts/TodoContext'

interface Props {
    closeParentDialog?: () => void;
}

const formSchema = z.object({
    title: z.string().min(2, {
        message: 'Title must be at least 2 characters',
    }).max(50, {
        message: 'Title must be less than 50 characters',
    }),
    tags: z.string().min(2).max(50),
})

export function CreateTodoForm({closeParentDialog}: Props) {
    const { createTodo } = useTodos();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {
            title: "",
        },
    })

    function onSubmit(values: z.infer<typeof formSchema>) {
        createTodo(values.title);

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
                <FormField
                    control={form.control}
                    name="tags"
                    render={({ field }) => (
                        <FormItem>
                            <FormLabel>Tags</FormLabel>
                            <FormControl>
                                <Input placeholder="health, school, work..." {...field} />
                            </FormControl>
                            {/* <FormDescription>
                                Todo description.
                            </FormDescription> */}
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Create</Button>
            </form>
        </Form>
    )
}