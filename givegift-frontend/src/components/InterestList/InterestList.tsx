import React from "react";
import styles from "./InterestList.module.css";
import { Tag } from "../UI/Tag/Tag";
import { PlusButton } from "../UI/Button/PlusButton/PlusButton";

interface InterestListProps {
  remove: (interest: string) => void;
  setVisible: (visible: boolean) => void;
}

const InterestList: React.FC<InterestListProps> = ({ remove, setVisible }) => {

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
  ]
  return (

    <div className={`${styles.interest_list} slider`}>
      {userInterests.map((curr_interest) => (
        <Tag key={curr_interest} isRemovable={true} remove={remove} tagName={curr_interest} />
      ))}
      <PlusButton onClick={() => setVisible(true)} />
    </div>
  );
};

export default InterestList;
