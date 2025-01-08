import { Session, User } from "@supabase/supabase-js";
import { useSupabase } from "./SupabaseContext";
import { createContext, useContext, useEffect, useState } from "react";
import { useQueryClient } from "@tanstack/react-query";

interface AuthContextType {
    user: any;
    session: any;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({children}) => {
    const queryClient = useQueryClient();
    const supabase = useSupabase();
    const [user, setUser] = useState<User | null>(null);
    const [session, setSession] = useState<Session | null>(null);

    useEffect(() => {
        const {data: {subscription}} = supabase.auth.onAuthStateChange(
            (_event, session) => {
                setSession(session);
                setUser(session?.user || null);
                queryClient.invalidateQueries({queryKey:['todos']});
            }
        )

        return () => {
            subscription.unsubscribe();
        }
    }, [])

    return (
        <AuthContext.Provider value={{user, session}}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error('useAuth must be used within an AuthPRovider');
    }
    return context;
}