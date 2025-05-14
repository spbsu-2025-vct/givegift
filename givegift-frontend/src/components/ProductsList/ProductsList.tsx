
import { ResultsNotFound } from "../../pages/Error/ResultsNotFound/ResultsNotFound";
import type { IProduct } from "../../types";
import ProductCard from "../UI/ProductCard/ProductCard";
import styles from "./ProductsList.module.css";

interface ProductsListProps {
    products: IProduct[];
}

const ProductsList: React.FC<ProductsListProps> = ({ products }) => {
    return (
        <>
            {products && products.length === 0 ? (
                <ResultsNotFound />
            ) : (
                <div className={`${styles.idea_list} fadein slider`}>
                    <span className={styles.found_ideas_header}>
                        {"По вашему запросу найдено"}
                    </span>
                    <div className={styles.ideas}>
                        {products.map(
                            (
                                idea,
                                ind, // Имеем право юзать индекс в мапе как key, т.к. контент не будет удаляться/изменяться до нажатия на кнопку генерации, а при нажатии весь прошлый контент уйдет, что позволяет нам сказать, что такой key-статичен и уникален
                            ) => (
                                <ProductCard
                                    key={ind}
                                    market_link={idea.market_link}
                                    title={idea.title}
                                    img_link={idea.img_link}
                                />
                            ),
                        )}
                    </div>
                </div>
            )}
        </>
    );
};

export default ProductsList;
