import React from "react";
import styles from "./TagList.module.css";
import { Tag } from "../UI/Tag/Tag";
import type { Tag as TagType } from "../../types"
import { PlusButton } from "../UI/Button/PlusButton/PlusButton";
import { AddTagsDialog } from "../UI/Dialog/AddTagsDialog";

interface TagListProps {
  removeTag: (tag: TagType) => void;
  addTags: (tags: TagType[]) => void;

  userTags: TagType[];
  allTags: TagType[];

  dialogTitle: string;
  textFieldLabel: string;
}

const TagList: React.FC<TagListProps> = ({
  removeTag, addTags, userTags, allTags,
  dialogTitle, textFieldLabel
}) => {
  const availableTags = allTags.filter((i) => !userTags.includes(i));

  const [open, setOpen] = React.useState(false);
  const [selectedTags, setSelectedTags] = React.useState<TagType[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedTags([]);
  };

  return (
    <div className={`${styles.tag_list} slider`}>
      {userTags.map((curr_tag) => (
        <Tag
          key={curr_tag}
          isRemovable={true}
          remove={removeTag}
          tagName={curr_tag}
        />
      ))}
      <PlusButton onClick={handleClickOpen} />

      <AddTagsDialog
        open={open} handleClose={handleClose}
        addTags={addTags} availableTags={availableTags}
        selectedTags={selectedTags} setSelectedTags={setSelectedTags}
        dialogTitle={dialogTitle}
        textFieldLabel={textFieldLabel}
      />
    </div>
  );
};

export default TagList;
