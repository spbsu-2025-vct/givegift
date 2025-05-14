import React from "react";
import styles from "./ActiveButton.module.css";

export interface ActiveButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  btnRef?: React.Ref<HTMLButtonElement>;
}

const ActiveButton: React.FC<ActiveButtonProps> = ({
  children,
  className = "",
  btnRef,
  ...props
}) => {
  return (
    <button
      ref={btnRef}
      {...props}
      className={`${styles.active_btn} ${className}`}
    >
      {children}
    </button>
  );
};

export default ActiveButton;
