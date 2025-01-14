import { useForm } from "react-hook-form";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "../ui/form";
import { Input } from "../ui/input";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "../ui/button";
import { toast } from "sonner";
import { useSupabase } from "@/contexts/SupabaseContext";
import { GoogleLogin } from "../GoogleLogin/GoogleLogin";
import { Separator } from "../ui/separator";
import { Link } from "react-router-dom";
import { Label } from "../ui/label";

const formSchema = z.object({
    email: z.string().email(),
    password: z.string()
        .min(8, {message: 'Password must be between 8 and 64 characters'})
        .max(64, {message: 'Password cannot be longer than 64 characters'}),
});

interface Props {
    closeParentDialog?: () => void,
}

export function LogInForm({closeParentDialog}: Props){
    const supabase = useSupabase();

    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
        defaultValues: {

        },
    })

    async function onSubmit(values: z.infer<typeof formSchema>) {
        const {data, error} = await supabase.auth.signInWithPassword({
            email: values.email,
            password: values.password,
        })
        if (error) {
            // alert('Incorrect password or user does not exist.');
            console.log(error.code);
            // toast('Failed to sign in');
            // set server errors as root; they don't persist per submission!
            form.setError('root.serverError', {
                type: error.code
            })
            return;
        }
        toast('Signed in successfully!');

        console.log('signed in!');
        console.log(data);

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