import { useSupabase } from "@/contexts/SupabaseContext";
import { Button } from "../ui/button";


export function GoogleLogin() {
    const supabase = useSupabase();

    async function signIn() {
        await supabase.auth.signInWithOAuth({
            provider: 'google',
            options: {
                redirectTo: 'https://jackchealdang.github.io/minimo'
            }
        })
    }

    return (
        <Button variant='outline' className="w-full" onClick={signIn}>
            Login with Google
        </Button>
    )
}