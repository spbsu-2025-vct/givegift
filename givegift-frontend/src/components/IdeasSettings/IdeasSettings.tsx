import { type ChangeEvent } from "react";
import styles from "./IdeasSettings.module.css";
import { SidebarContentBlock } from "../SidebarContentBlock/SidebarContentBlock";
import RangeSlider from "../UI/RangeSlider/RangeSlider";
import InterestList from "../InterestList/InterestList";

interface IdeasSettingsProps {
    priceRangeValue: number[];
    handlePriceRangeChange: (event: Event | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: number[]) => void;
}

const CustomSettings: React.FC<IdeasSettingsProps> = ({ priceRangeValue, handlePriceRangeChange }) => {
    // TODO: InterestList is mocked
    return (
        <div className={styles.custom_settings}>
            <SidebarContentBlock title={"Интересы"}>
                <InterestList remove={() => { }} setVisible={() => { }} />
            </SidebarContentBlock>

            <SidebarContentBlock title={"Цена"}>
                <RangeSlider priceRangeValue={priceRangeValue} handlePriceRangeChange={handlePriceRangeChange} />
            </SidebarContentBlock>
        </div>
    );
};

export default CustomSettings;
