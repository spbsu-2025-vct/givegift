import styles from "./ResultsNotFound.module.css";
import not_found from "../../../assets/mascot_not_found.png";

export const ResultsNotFound = () => {
  return (
    <div className="slider fadein" style={{ display: "grid" }}>
      <div className={styles.not_found}>
        <img src={not_found} alt="not found" />
        <div className={styles.not_found_text}>
          <span className={styles.main}>Ничего не найдено...</span>
          <span className={styles.secondary}>
            Специализируйте параметры поиска и попробуйте еще раз
          </span>
        </div>
      </div>
    </div>
  );
};

