import React from "react";
import styles from "./InterestList.module.css";
import { Tag } from "../UI/Tag/Tag";
import { PlusButton } from "../UI/Button/PlusButton/PlusButton";
import { AddInterestsDialog } from "../UI/Dialog/AddInterestsDialog";
interface InterestListProps {
  removeInterest: (interest: string) => void;
  addInterests: (interests: string[]) => void;
}

const InterestList: React.FC<InterestListProps> = ({
  addInterests,
  removeInterest,
}) => {
  // TODO: mocked
  const userInterests = [
    "Природа",
    "Спорт",
    "Культура",
    "Кино",
    "Музыка",
    "Театр",
    "Книги",
    "Кулинария",
    "Путешествия",
    "Автомобили",
    "Политика",
    "Дизайн",
    "Искусство",
    "Животные",
  ];

  const allInterests = [
    "Прaирода",
    "Спsорт",
    "Куaльтура",
    "Кsино",
    "Муaзыка",
    "Теаaтр",
    "Книaги",
    "Кулиaнария",
    "Путешествия",
    "Автaомобили",
    "Полиaтика",
    "Диaзайн",
    "Исaкусство",
    "Жиaвотные",
    "Дaухи",
  ];

  const availableInterests = allInterests.filter(
    (i) => !userInterests.includes(i)
  );

  const [open, setOpen] = React.useState(false);
  const [selectedInterests, setSelectedInterests] = React.useState<string[]>([]);

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
