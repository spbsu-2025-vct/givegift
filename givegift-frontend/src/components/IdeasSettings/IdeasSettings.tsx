import { type ChangeEvent } from "react";
import styles from "./IdeasSettings.module.css";
import { SidebarContentBlock } from "../SidebarContentBlock/SidebarContentBlock";
import RangeSlider from "../UI/RangeSlider/RangeSlider";
import InterestList from "../InterestList/InterestList";
import { useInterests } from "../../context/InterestContext/InterestContext";

interface IdeasSettingsProps {
    priceRangeValue: number[];
    handlePriceRangeChange: (event: Event | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: number[]) => void;
}

const CustomSettings: React.FC<IdeasSettingsProps> = ({ priceRangeValue, handlePriceRangeChange }) => {
    const { userInterests, setUserInterests } = useInterests();

    const removeInterest = (interest: string) => {
        setUserInterests(userInterests.filter((i) => i !== interest));
    }

    const addInterests = (interests: string[]) => {
        setUserInterests([...userInterests, ...interests]);
    }

    return (
        <div className={styles.custom_settings}>
            <SidebarContentBlock title={"Интересы"}>
                <InterestList removeInterest={removeInterest} addInterests={addInterests} />
            </SidebarContentBlock>

            <SidebarContentBlock title={"Цена"}>
                <RangeSlider priceRangeValue={priceRangeValue} handlePriceRangeChange={handlePriceRangeChange} />
            </SidebarContentBlock>
        </div>
    );
};

export default CustomSettings;
