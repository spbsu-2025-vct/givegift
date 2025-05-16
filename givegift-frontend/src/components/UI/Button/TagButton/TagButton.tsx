import React, { useState, useEffect } from "react";
import {
    IconButton,
    Popover,
    Box,
    TextField,
    Tooltip,
} from "@mui/material";
import BookmarkBorderIcon from "@mui/icons-material/BookmarkBorder";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import EditIcon from "@mui/icons-material/Edit";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./TagButton.module.css";

export interface TagButtonProps {
    currentTag?: string;
    onSave: (newTag: string) => Promise<void>;
}

const TagButton: React.FC<TagButtonProps> = ({ currentTag = "", onSave }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const open = Boolean(anchorEl);
    const [isEditing, setIsEditing] = useState(false);
    const [editedTag, setEditedTag] = useState(currentTag);

    // keep local state in sync if parent tag changes
    useEffect(() => {
        setEditedTag(currentTag);
    }, [currentTag]);

    const handleClick = (e: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(prev => (prev ? null : e.currentTarget));
        setIsEditing(false);
    };
    const handleClose = () => {
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
                    <TextField
                        size="small"
                        value={editedTag}
                        onChange={(e) => setEditedTag(e.target.value)}
                        placeholder="нет тега"
                        disabled={!isEditing}
                        sx={{ maxWidth: '200px' }}
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
