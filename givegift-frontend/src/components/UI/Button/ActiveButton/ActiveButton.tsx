import React from "react";
import styles from "./ActiveButton.module.css";

interface ActiveButtonProps {
  children: React.ReactNode;
  className?: string;
  btnRef?: React.RefObject<HTMLButtonElement>;
  disabled?: boolean;
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
}

const ActiveButton = ({ children, className, btnRef, ...props }: ActiveButtonProps) => {
  return (
    <button
      ref={btnRef}
      {...props}
      className={styles.active_btn + " " + className}
    >
      {children}
    </button>
  );
};

export default ActiveButton;
