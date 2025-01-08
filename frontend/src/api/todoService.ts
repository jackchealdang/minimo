import { useSupabase } from "@/contexts/SupabaseContext";


export async function fetchTodos() {
    const supabase = useSupabase();
    const { data, error } = await supabase.from('todo').select()
    return data;
}