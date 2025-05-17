import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Tag } from "../../../types";

interface AddTagsDialogProps {
    open: boolean;
    handleClose: () => void;
    addTags: (tags: Tag[]) => void;
    availableTags: Tag[];
    selectedTags: Tag[];
    setSelectedTags: (tags: Tag[]) => void;

    dialogTitle: string;
    textFieldLabel: string;
}

export const AddTagsDialog: React.FC<AddTagsDialogProps> = ({
    open, handleClose,
    addTags, availableTags, selectedTags, setSelectedTags,
    dialogTitle, textFieldLabel
}) => {
    return <BootstrapDialog open={open} onClose={handleClose}>
        <DialogTitle>{dialogTitle}</DialogTitle>
        <IconButton
            aria-label="close"
            onClick={handleClose}
            sx={(theme) => ({
                position: "absolute",
                right: 8,
                top: 8,
                color: theme.palette.grey[500],
            })}
        >
            <CloseIcon />
        </IconButton>
        <DialogContent dividers sx={{ width: "450px", maxHeight: "150px" }}>
            <Autocomplete
                multiple
                options={availableTags}
                value={selectedTags}
                onChange={(_, value) => setSelectedTags(value)}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label={textFieldLabel}
                        variant="outlined" />
                )}
                sx={{ width: "100%", margin: "5px 0" }} />


        </DialogContent>

        <DialogActions>
            <Button
                onClick={() => {
                    addTags(selectedTags);
                    handleClose();
                }}
                disabled={selectedTags.length === 0}
                autoFocus
            >
                Добавить
            </Button>
        </DialogActions>
    </BootstrapDialog>;
}

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
    "& .MuiDialogContent-root": {
        padding: theme.spacing(2),
    },
    "& .MuiDialogActions-root": {
        padding: theme.spacing(1),
    },
}));