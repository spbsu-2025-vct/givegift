import { ResultsError } from "../../../pages/Error/ResultsError/ResultsError";
import type { IFavProduct } from "../../../types";
import ProductsList from "../../ProductsList/ProductsList";
import { ProductsLoader } from "../../UI/Loader/ProductsLoader/ProductsLoader";

interface FavouritesMainContentProps {
    isUserFavouritesLoading: boolean;
    userFavouritesError: string;
    userFavourites: IFavProduct[];
}

export const FavouritesMainContent: React.FC<FavouritesMainContentProps> = ({
    isUserFavouritesLoading,
    userFavouritesError,
    userFavourites,
}) => {

    return (
        isUserFavouritesLoading ? (
            <ProductsLoader loadingText={"Ищем избранное..."} />
        ) : userFavouritesError ? (
            <ResultsError errorMsg={userFavouritesError} />
        ) : (
            <ProductsList products={userFavourites} />
        )
    );
};