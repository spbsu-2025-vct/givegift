import { useFavourites } from "../../../context/FavouritesContext/FavouritesContext";
import { ResultsError } from "../../../pages/Error/ResultsError/ResultsError";
import ProductsList from "../../ProductsList/ProductsList";
import { ProductsLoader } from "../../UI/Loader/ProductsLoader/ProductsLoader";

export const FavouritesMainContent = () => {
    const { isUserFavouritesLoading, userFavouritesError, allUserFavourites } = useFavourites()

    return (
        isUserFavouritesLoading ? (
            <ProductsLoader loadingText={"Ищем избранное..."} />
        ) : userFavouritesError ? (
            <ResultsError errorMsg={userFavouritesError} />
        ) : (
            <ProductsList products={allUserFavourites} />
        )
    );
};