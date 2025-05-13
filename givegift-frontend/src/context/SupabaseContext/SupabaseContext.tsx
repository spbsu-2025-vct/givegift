/**
 * Provides the Supabase context which wraps the application with the Supabase client,
 * session data, loading status, and error messages. This file initializes and manages the
 * Supabase client and authentication state, subscribing to authentication changes and
 * providing a hook for accessing the client and session throughout the application.
 */

import React, {
    createContext,
    useContext,
    useEffect,
    useState,
    type ReactNode,
} from "react";
import { type SupabaseClient, type Session } from "@supabase/supabase-js";
import { supabase } from "./supabase";

interface SupabaseContextType {
    supabase: SupabaseClient;
    session: Session | null;
    loading: boolean;
    error: string;
}

export const SupabaseContext = createContext<SupabaseContextType | undefined>(
    undefined
);

export const SupabaseContextProvider: React.FC<{
    children: ReactNode;
}> = ({ children }) => {
    const [session, setSession] = useState<Session | null>(null);
    const [error, setError] = useState<string>("");

    const [loading, setLoading] = useState<boolean>(true);

    useEffect(() => {
        let mounted = true;
        setLoading(true);

        supabase.auth
            .getSession()
            .then(({ data: { session } }) => {
                if (mounted) setSession(session);
            })
            .catch(err => {
                if (mounted) setError(err.message);
            })
            .finally(() => {
                if (mounted) setLoading(false);
            });

        const { data: listener } = supabase.auth.onAuthStateChange((_, newSession) => {
            if (mounted) setSession(newSession);
        });

        return () => {
            mounted = false;
            listener.subscription.unsubscribe();
        };
    }, []);

    return (
        <SupabaseContext.Provider value={{ supabase, session, loading, error }}>
            {children}
        </SupabaseContext.Provider>
    );
};

export const useSupabase = (): SupabaseContextType => {
    const ctx = useContext(SupabaseContext);
    if (!ctx)
        throw new Error(
            "useSupabase must be used within a SupabaseContextProvider"
        );
    return ctx;
};
