import React, { useState, useEffect } from "react";
import {
    IconButton,
    Popover,
    Box,
    TextField,
    Tooltip,
    Autocomplete,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./TagButton.module.css";
import { useFavourites } from "../../../../context/FavouritesContext/FavouritesContext";
import type { Tag } from "../../../../types";

export interface TagButtonProps {
    currentTag: Tag;
    onSave: (newTag: Tag) => Promise<void>;
}

const TagButton: React.FC<TagButtonProps> = ({ currentTag, onSave }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTag, setEditedTag] = useState(currentTag);
    const { allUserTags } = useFavourites();

    // keep local state in sync if parent tag changes
    useEffect(() => {
        setEditedTag(currentTag);
    }, [currentTag]);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        if (anchorEl) {
            setEditedTag(currentTag);
        }
        setAnchorEl(prev => (prev ? null : e.currentTarget));
        setIsEditing(false);
    };
    const handleClose = () => {
        setEditedTag(currentTag);
        setAnchorEl(null);
        setIsEditing(false);
    };

    const handleSave = async () => {
        await onSave(editedTag);
        setIsEditing(false);
        setAnchorEl(null);
    };

    return (
        <>
            <Tooltip title="Изменить тег" placement="top">
                <IconButton
                    className={styles.bookmarkButton}
                    onClick={handleClick}
                    aria-label="View/edit tag"
                >
                    {open ? <BookmarkIcon /> : <BookmarkBorderIcon />}
                </IconButton>
            </Tooltip>

            <Popover
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
                transformOrigin={{ vertical: 'top', horizontal: 'left' }}
            >
                <Box sx={{
                    padding: "10px 15px",
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    gap: '10px',
                    height: '40px'
                }}>
                    <Autocomplete
                        freeSolo
                        disableClearable
                        options={allUserTags}
                        value={editedTag}
                        onChange={(_, newVal) => setEditedTag(newVal ?? "")}
                        inputValue={editedTag}
                        onInputChange={(_, newValue) => setEditedTag(newValue)}
                        disabled={!isEditing}
                        sx={{ width: 200 }}
                        renderInput={(params) => (
                            <TextField
                                {...params}
                                size="small"
                                placeholder="Тег отсутствует"
                            />
                        )}
                    />
                    <Box>
                        {isEditing ? (
                            <IconButton
                                size="small"
                                onClick={handleSave}
                            >
                                <CheckIcon fontSize="small" />
                            </IconButton>)
                            : (
                                <IconButton
                                    size="small"
                                    onClick={() => setIsEditing(true)}
                                >
                                    <EditIcon fontSize="small" />
                                </IconButton>
                            )
                        }

                    </Box>
                </Box>
            </Popover>
        </>
    );
};

export default TagButton;
