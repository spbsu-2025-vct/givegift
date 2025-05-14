import { useState, type ChangeEvent, type FC } from "react";
import styles from "./MainSidebarContent.module.css";
import IdeasSettings from "../../IdeasSettings/IdeasSettings";
import ActiveButton from "../../UI/Button/ActiveButton/ActiveButton";
import { checkPrice } from "../../../utils/checkers";
import { maxPrice, minPrice } from "../../../utils/constants";
import { useInterests } from "../../../context/InterestContext/InterestContext";
import { useIdeas } from "../../../context/IdeasContext/IdeasContext";

interface MainSidebarContentProps {
    setIsNewUser: React.Dispatch<React.SetStateAction<boolean>>
}

export const MainSidebarContent: FC<MainSidebarContentProps> = ({ setIsNewUser }) => {
    const { generateIdeas, isIdeasLoading } = useIdeas();
    const { userInterests } = useInterests();

    const getIdeas = () => {
        generateIdeas({
            interests: userInterests,
            price_range: priceRangeValue,
        });
        setIsNewUser(false);
    };

    const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice]);

    const handlePriceRangeChange = (_event: Event | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: number[]) => {
        setPriceRangeValue(checkPrice(minPrice, maxPrice, newValue as [number, number]));
    };

    return (
        <div className={styles.mainpage_sidebar_content}>
            <IdeasSettings priceRangeValue={priceRangeValue} handlePriceRangeChange={handlePriceRangeChange} />

            <ActiveButton
                className={styles.mainpage_sidebar_btn}
                disabled={isIdeasLoading}
                onClick={getIdeas}
            >
                Выдай идею!
            </ActiveButton>
        </div>
    )
};
