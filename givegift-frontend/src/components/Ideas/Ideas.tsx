import { useIdeas } from "../../context/IdeasContext/IdeasContext";
import { ResultsError } from "../../pages/Error/ResultsError/ResultsError";
import ProductsList from "../ProductsList/ProductsList";
import { ProductsLoader } from "../UI/Loader/ProductsLoader/ProductsLoader";


export const Ideas = () => {
    const { productIdeas, isIdeasLoading, ideaError } = useIdeas();

    return (
        <>
            {isIdeasLoading ? (
                <ProductsLoader loadingText={"Придумываем идеи..."} />
            ) : ideaError ? (
                <ResultsError errorMsg={ideaError} />
            ) : (
                <ProductsList products={productIdeas} />
            )}
        </>
    );
}