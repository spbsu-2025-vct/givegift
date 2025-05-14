import { useState, type ChangeEvent } from "react";
import styles from "./IdeasSettings.module.css";
import { minPrice, maxPrice } from "../../utils/constants";
import { checkPrice } from "../../utils/checkers";
import ActiveButton from "../UI/Button/ActiveButton/ActiveButton";
import { useIdeas } from "../../context/IdeasContext/IdeasContext";
import { useInterests } from "../../context/InterestContext/InterestContext";
import { SidebarContentBlock } from "../SidebarContentBlock/SidebarContentBlock";
import RangeSlider from "../UI/RangeSlider/RangeSlider";

const CustomSettings = () => {
    const { generateIdeas, isIdeasLoading } = useIdeas();
    const { userInterests } = useInterests();

    const [priceRangeValue, setPriceRangeValue] = useState([minPrice, maxPrice]);

    const handlePriceRangeChange = (_event: Event | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: number[]) => {
        setPriceRangeValue(checkPrice(minPrice, maxPrice, newValue as [number, number]));
    };

    const getIdeas = () => {
        generateIdeas({
            interests: userInterests,
            price_range: priceRangeValue,
        });
    };

    return (
        <div className={styles.custom_settings}>
            <SidebarContentBlock title={"Интересы"}>
                TODO
            </SidebarContentBlock>

            <SidebarContentBlock title={"Цена"}>
                <RangeSlider priceRangeValue={priceRangeValue} handlePriceRangeChange={handlePriceRangeChange} />
            </SidebarContentBlock>

            <ActiveButton
                className={styles.mainpage_sidebar_btn}
                disabled={isIdeasLoading}
                onClick={getIdeas}
            >
                Выдай идею!
            </ActiveButton>
        </div>
    );
};

export default CustomSettings;
