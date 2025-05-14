import { Autocomplete, Button, Dialog, DialogActions, DialogContent, DialogTitle, IconButton, styled, TextField } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import type { Interest } from "../../../types";

interface AddInterestsDialogProps {
    open: boolean;
    handleClose: () => void;
    addInterests: (interests: Interest[]) => void;
    availableInterests: Interest[];
    selectedInterests: Interest[];
    setSelectedInterests: (interests: Interest[]) => void;
}

export const AddInterestsDialog: React.FC<AddInterestsDialogProps> = ({
    open, handleClose, addInterests, availableInterests, selectedInterests, setSelectedInterests
}) => {
    return <BootstrapDialog open={open} onClose={handleClose}>
        <DialogTitle>Добавить интересы</DialogTitle>
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
                options={availableInterests}
                value={selectedInterests}
                onChange={(_, value) => setSelectedInterests(value)}
                filterSelectedOptions
                renderInput={(params) => (
                    <TextField
                        {...params}
                        label="Поиск интересов"
                        variant="outlined" />
                )}
                sx={{ width: "100%", margin: "5px 0" }} />


        </DialogContent>

        <DialogActions>
            <Button
                onClick={() => {
                    addInterests(selectedInterests);
                    handleClose();
                }}
                disabled={selectedInterests.length === 0}
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