import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useSupabase } from "@/contexts/SupabaseContext";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, {message: 'Password must be between 8 and 64 characters'})
        .max(64, {message: 'Password cannot be longer than 64 characters'}),
    confirmPassword: z.string(),
}).refine((data) => data.password === data.confirmPassword, {
    message: "Passwords did not match.",
    path: ['confirmPassword'],
});

interface Props {
    closeParentDialog?: () => void,
}

export function SignUpForm({closeParentDialog}: Props){
    const supabase = useSupabase();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {data, error} = await supabase.auth.signUp({
            email: values.email,
            password: values.password,
        })
        if (error) {
            toast('Failed to sign up');
            return;
        }
        toast('Signed up successfully!');

        console.log('submitted!');
        console.log(values);
        console.log(data);

        if (typeof closeParentDialog === 'function') closeParentDialog(); 
    }

    return (
        <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
                <FormField
                    control={form.control}
                    name="email"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Email</FormLabel>
                            <FormControl>
                                <Input id="email" type="text" placeholder="johnsmith@gmail.com" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="password"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Password</FormLabel>
                            <FormControl>
                                <Input id="password" type="password" placeholder="" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <FormField
                    control={form.control}
                    name="confirmPassword"
                    render={({field}) => (
                        <FormItem>
                            <FormLabel>Confirm Password</FormLabel>
                            <FormControl>
                                <Input id="confirmPassword" type="password" placeholder="" {...field}/>
                            </FormControl>
                            <FormMessage/>
                        </FormItem>
                    )}
                />
                <Button type='submit'>Sign Up</Button>
            </form>
        </Form>
    )   
}