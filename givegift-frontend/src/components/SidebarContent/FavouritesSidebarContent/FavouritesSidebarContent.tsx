import { InputAdornment, TextField } from "@mui/material";
import type { Tag as TagType } from "../../../types";
import { SidebarContentBlock } from "../../SidebarContentBlock/SidebarContentBlock";
import { Tag } from "../../UI/Tag/Tag";
import styles from "./FavouritesSidebarContent.module.css";
import SearchIcon from "@mui/icons-material/Search";

interface FavouritesSidebarContentProps {
    currentTags: TagType[];
    removeTag: (tag: TagType) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const FavouritesSidebarContent: React.FC<FavouritesSidebarContentProps> = ({
    currentTags, removeTag, searchQuery, setSearchQuery
}) => {

    return (
        <div className={styles.favourites_sidebar_content}>

            <SidebarContentBlock title="Поиск">
                <TextField
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    placeholder="Поиск продуктов"
                    variant="outlined"
                    size="small"
                    fullWidth
                    slotProps={{
                        input: {
                            startAdornment: (
                                <InputAdornment position="start">
                                    <SearchIcon fontSize="small" />
                                </InputAdornment>
                            ),
                        },
                    }}
                />
            </SidebarContentBlock>
            <SidebarContentBlock title="Коллекции">
                <div className={`${styles.tag_list} slider`}>
                    {currentTags.map((curr_tag) => (
                        <Tag
                            key={curr_tag}
                            isRemovable={true}
                            remove={removeTag}
                            tagName={curr_tag}
                        />
                    ))}
                </div>
            </SidebarContentBlock>
        </div>
    );
};