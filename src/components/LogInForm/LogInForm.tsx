import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { useSupabase } from "@/contexts/SupabaseContext";
import { GoogleLogin } from "../GoogleLogin/GoogleLogin";
import { Separator } from "../ui/separator";
import { Link, useNavigate } from "react-router-dom";
import { Label } from "../ui/label";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string(),
});

interface Props {
    closeParentDialog?: () => void,
}

export function LogInForm({closeParentDialog}: Props){
    const supabase = useSupabase();
    const navigate = useNavigate();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {_data, error} = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        })
        if (error) {
            console.log(error.code);
            form.setError('root.serverError', {
                type: error.code
            })
            return;
        }
        navigate('/todo-supabase');

        if (typeof closeParentDialog === 'function') closeParentDialog(); 
    }

    return (
        <div className="grid gap-4">
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
                <Button type='submit' className="w-full">Login</Button>
            </form>
            {form.formState.errors.root?.serverError.type === 'invalid_credentials' && <Label className="text-destructive">Incorrect password</Label>}
            {form.formState.errors.root?.serverError.type === 'email_not_confirmed' && <Label className="text-destructive">Please check your email for the confirmation link</Label>}
        </Form>
        <Separator/>
        <GoogleLogin/>
        <div className="text-center">
            Don't have an account?{" "}
            <Link to='/todo-supabase/signup' className="underline underline-offset-4">Sign up</Link>
        </div>
        </div>
    )   
}