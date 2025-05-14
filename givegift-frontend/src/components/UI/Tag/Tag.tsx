import styles from "./Tag.module.css";
import x_btn from "../../../assets/x_btn.png";
import type React from "react";

interface TagProps {
  tagName: string;
  remove: (tag: string) => void;
  isRemovable: boolean;
}

export const Tag: React.FC<TagProps> = ({ tagName, remove, isRemovable }) => {
  return (
    <div className={styles.tag}>
      <div className={styles.tag_content}>
        <span>{tagName}</span>
        {isRemovable && (
          <img
            className={styles.xBtn}
            src={x_btn}
            onClick={() => remove(tagName)}
            alt="x"
          />
        )}
      </div>
    </div>
  );
};
