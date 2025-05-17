import { type ChangeEvent } from "react";
import styles from "./IdeasSettings.module.css";
import { SidebarContentBlock } from "../SidebarContentBlock/SidebarContentBlock";
import RangeSlider from "../UI/RangeSlider/RangeSlider";
import TagList from "../TagList/TagList";
import { useInterests } from "../../context/InterestContext/InterestContext";
import type { Interest } from "../../types";

interface IdeasSettingsProps {
    priceRangeValue: number[];
    handlePriceRangeChange: (event: Event | ChangeEvent<HTMLInputElement | HTMLTextAreaElement>, newValue: number[]) => void;
}

const CustomSettings: React.FC<IdeasSettingsProps> = ({ priceRangeValue, handlePriceRangeChange }) => {
    const { userInterests, setUserInterests, allInterests } = useInterests();

    const removeInterest = (interest: Interest) => {
        setUserInterests(userInterests.filter((i) => i !== interest));
    }

    const addInterests = (interests: Interest[]) => {
        setUserInterests([...userInterests, ...interests]);
    }

    return (
        <div className={styles.custom_settings}>
            <SidebarContentBlock title={"Интересы"}>
                <TagList
                    userTags={userInterests} allTags={allInterests}
                    removeTag={removeInterest} addTags={addInterests}
                    dialogTitle={"Выберите интересы"} textFieldLabel={"Интересы"}
                />
            </SidebarContentBlock>

            <SidebarContentBlock title={"Цена"}>
                <RangeSlider priceRangeValue={priceRangeValue} handlePriceRangeChange={handlePriceRangeChange} />
            </SidebarContentBlock>
        </div>
    );
};

export default CustomSettings;
