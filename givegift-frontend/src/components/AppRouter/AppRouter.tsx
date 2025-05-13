import { Routes, Route } from "react-router-dom";
import { useSupabase } from "../../context/SupabaseContext/SupabaseContext";
import { privateRoutes } from "../../router";
import { SupabaseAuth } from "../../pages/Auth/SupabaseAuth";
import { PageLoader } from "../UI/Loader/PageLoader/PageLoader";
import { NotFound } from "../../pages/Error/NotFound";

export const AppRouter = () => {
    const { session, loading } = useSupabase();

    return (
        loading
            ? <PageLoader />
            : (session ?
                <Routes>
                    {privateRoutes.map(route =>
                        <Route
                            key={route.path}
                            path={route.path}
                            element={<route.component />}
                        />
                    )}
                    <Route path="*" element={<NotFound />} />
                </Routes>
                : <SupabaseAuth />
            )
    );
};
