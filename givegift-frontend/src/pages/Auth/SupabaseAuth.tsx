import { Box } from "@mui/material";
import { ThemeSupa } from "@supabase/auth-ui-shared";
import { Auth } from "@supabase/auth-ui-react";
import { useSupabase } from "../../context/SupabaseContext/SupabaseContext";

export const SupabaseAuth = () => {
    const { supabase } = useSupabase();

    return (
        <Box
            sx={{
                margin: "15vh auto 0",
                padding: "20px",
                maxWidth: "30vw",
                minWidth: "320px",
                border: "1px solid lightgrey",
                borderRadius: "4px",
            }}
        >
            <Auth
                supabaseClient={supabase}
                providers={["google", "github"]}
                appearance={{
                    theme: ThemeSupa,
                    className: {
                        button: "custom-auth-button",
                    },
                }}
            />
        </Box>
    );
}
