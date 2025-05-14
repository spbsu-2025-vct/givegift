import plus_btn from "../../../../assets/plus_btn.png";
import styles from "./PlusButton.module.css";

interface PlusButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> { }

export const PlusButton: React.FC<PlusButtonProps> = (props) => {
  return (
    <button {...props} className={styles.plusBtn}>
      <img src={plus_btn} alt="+" />
    </button>
  );
};

