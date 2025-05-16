import React from "react";
import { SupabaseContextProvider } from "./SupabaseContext/SupabaseContext"
import { IdeasContextProvider } from "./IdeasContext/IdeasContext";
import { InterestContextProvider } from "./InterestContext/InterestContext";
import { FavouritesContextProvider } from "./FavouritesContext/FavouritesContext";

export const AppContext: React.FC<React.PropsWithChildren<{}>> = ({ children }) => (
    <SupabaseContextProvider>
        <InterestContextProvider>
            <IdeasContextProvider>
                <FavouritesContextProvider>
                    {children}
                </FavouritesContextProvider>
            </IdeasContextProvider>
        </InterestContextProvider>
    </SupabaseContextProvider>
);
