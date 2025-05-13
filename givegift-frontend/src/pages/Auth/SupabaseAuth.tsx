import { Box } from "@mui/material";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useSupabase } from "../../context/SupabaseContext/SupabaseContext";
import "./SupabaseAuth.css";
import { ru } from "./locale";


export const SupabaseAuth = () => {
    const { supabase } = useSupabase();

    return (
        <Box className="auth-container">
            <Box className="auth-wrapper slider">
                <Auth
                    supabaseClient={supabase}
                    providers={["google"]}
                    appearance={{
                        theme: ThemeSupa,
                        variables: {
                            default: {
                                colors: { brand: "#ff6332", brandAccent: "#ff6332" },
                                fonts: { bodyFontFamily: "Montserrat, sans-serif" },
                            },
                        },
                    }}
                    localization={{ variables: ru }}
                />
            </Box>
        </Box>
    );
};
