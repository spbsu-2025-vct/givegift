import React from "react";
import { SupabaseContextProvider } from "./SupabaseContext/SupabaseContext"
import { IdeasContextProvider } from "./IdeasContext/IdeasContext";
import { InterestContextProvider } from "./InterestContext/InterestContext";

// TODO: InterestContext & IdeasContext
export const AppContext: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <SupabaseContextProvider>
        <InterestContextProvider>
            <IdeasContextProvider>
                {children}
            </IdeasContextProvider>
        </InterestContextProvider>
    </SupabaseContextProvider>
);
