import styles from "./MarketButton.module.css";
import ActiveButton, { type ActiveButtonProps } from "../ActiveButton/ActiveButton";
import { openInNewTab } from "../../../../utils/helpers";
import shopping_cart from "../../../../assets/shopping_cart.png";
import type React from "react";

interface MarketButtonProps extends ActiveButtonProps {
  market_link: string;
}

const MarketButton: React.FC<MarketButtonProps> = ({ market_link, children }) => {
  return (
    <ActiveButton
      className={styles.market_button}
      onClick={() => openInNewTab(market_link)}
    >
      <div className={styles.market_button_content}>
        <img src={shopping_cart} alt="" />
        <span>{children}</span>
      </div>
    </ActiveButton>
  );
};

export default MarketButton;
