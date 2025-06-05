import styles from "./Popup.module.css";

export type Props = {
  uuid: string;
  type: "green" | "red";
  text: string;
};

const Popup = (props: Props) => {
  return <div className={`${styles.Popup}    ${props.type === "green" ? styles.greenBg : styles.redBg}`}>{props.text}</div>;
};

export default Popup;
