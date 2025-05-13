import React from "react";
import { SupabaseContextProvider } from "./SupabaseContext/SupabaseContext"

export const AppContext: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <SupabaseContextProvider>
        {children}
    </SupabaseContextProvider>
);
