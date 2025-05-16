
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
                <div className={`${styles.products_list} fadein slider`}>
                    <span className={styles.products_list_header}>
                        {"По вашему запросу найдено"}
                    </span>
                    <div className={styles.products}>
                        {products.map(
                            (
                                product,
                                ind, // Имеем право юзать индекс в мапе как key, т.к. контент не будет удаляться/изменяться до нажатия на кнопку генерации, а при нажатии весь прошлый контент уйдет, что позволяет нам сказать, что такой key-статичен и уникален
                            ) => (
                                <ProductCard
                                    key={ind}
                                    market_link={product.market_link}
                                    title={product.title}
                                    img_link={product.img_link}
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
