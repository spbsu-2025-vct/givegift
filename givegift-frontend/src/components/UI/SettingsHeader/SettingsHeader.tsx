import styles from "./SettingsHeader.module.css";

interface SettingsHeaderProps {
  text: string;
}

const SettingsHeader: React.FC<SettingsHeaderProps> = ({ text }) => {
  return <span className={styles.settings_h}>{text}</span>;
};

export default SettingsHeader;
