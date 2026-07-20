import { supabase } from "../supabase";

export async function Registro(email: string, password: string) {
    return await supabase.auth.signUp({
        email,
        password
    });
}

export async function Login(email: string, password: string) {
    return await supabase.auth.signInWithPassword({
        email,
        password
    });
}