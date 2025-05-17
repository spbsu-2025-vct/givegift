import { InputAdornment, TextField } from "@mui/material";
import type { Tag as TagType } from "../../../types";
import { SidebarContentBlock } from "../../SidebarContentBlock/SidebarContentBlock";
import styles from "./FavouritesSidebarContent.module.css";
import SearchIcon from "@mui/icons-material/Search";
import TagList from "../../TagList/TagList";

interface FavouritesSidebarContentProps {
    allUserTags: TagType[];
    currentTags: TagType[];
    addTags: (tags: TagType[]) => void;
    removeTag: (tag: TagType) => void;
    searchQuery: string;
    setSearchQuery: (query: string) => void;
}

export const FavouritesSidebarContent: React.FC<FavouritesSidebarContentProps> = ({
    allUserTags, currentTags, addTags, removeTag, searchQuery, setSearchQuery
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
                <TagList
                    userTags={currentTags}
                    allTags={allUserTags}
                    removeTag={removeTag}
                    addTags={addTags}
                    dialogTitle="Выберите теги"
                    textFieldLabel="Теги"
                />
            </SidebarContentBlock>
        </div>
    );
};