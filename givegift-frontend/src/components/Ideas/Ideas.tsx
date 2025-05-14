import { useIdeas } from "../../context/IdeasContext/IdeasContext";
import { ResultsError } from "../../pages/Error/ResultsError/ResultsError";
import ProductsList from "../ProductsList/ProductsList";
import { IdeasLoader } from "../UI/Loader/IdeasLoader/IdeasLoader";


export const Ideas = () => {
    const { productIdeas, isIdeasLoading, ideaError } = useIdeas();

    return (
        <>
            {isIdeasLoading ? (
                <IdeasLoader loadingText={"Придумываем идеи..."} />
            ) : ideaError ? (
                <ResultsError errorMsg={ideaError} />
            ) : (
                <ProductsList products={productIdeas} />
            )}
        </>
    );
}