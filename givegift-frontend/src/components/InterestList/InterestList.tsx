import React from "react";
import styles from "./InterestList.module.css";
import { Tag } from "../UI/Tag/Tag";
import { PlusButton } from "../UI/Button/PlusButton/PlusButton";
import { AddInterestsDialog } from "../UI/Dialog/AddInterestsDialog";
import type { Interest } from "../../types";
import { useInterests } from "../../context/InterestContext/InterestContext";
interface InterestListProps {
  removeInterest: (interest: Interest) => void;
  addInterests: (interests: Interest[]) => void;
}

const InterestList: React.FC<InterestListProps> = ({
  addInterests,
  removeInterest,
}) => {
  const { userInterests, allInterests } = useInterests();

  const availableInterests = allInterests.filter(
    (i) => !userInterests.includes(i)
  );

  const [open, setOpen] = React.useState(false);
  const [selectedInterests, setSelectedInterests] = React.useState<Interest[]>([]);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedInterests([]);
  };

  return (
    <div className={`${styles.interest_list} slider`}>
      {userInterests.map((curr_interest) => (
        <Tag
          key={curr_interest}
          isRemovable={true}
          remove={removeInterest}
          tagName={curr_interest}
        />
      ))}
      <PlusButton onClick={handleClickOpen} />

      <AddInterestsDialog
        open={open} handleClose={handleClose}
        addInterests={addInterests} availableInterests={availableInterests}
        selectedInterests={selectedInterests} setSelectedInterests={setSelectedInterests}
      />
    </div>
  );
};

export default InterestList;
