import { useSupabase } from "@/contexts/SupabaseContext";


export async function fetchTodos() {
    const supabase = useSupabase();
    const { data } = await supabase.from('todo').select()
    return data;
}