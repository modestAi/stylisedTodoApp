import type { ActionDispatch, Dispatch } from "react";
import type { Action, TaskProp } from "../App";
import styles from "./Card.module.css";
import type { Props } from "./Popup";

import { v4 as uuidv4 } from "uuid";

const Card = (props: {
  state: TaskProp;
  dispatchFn: ActionDispatch<[action: Action]>;
  index: number;
  setPopup: Dispatch<React.SetStateAction<Props[]>>;
  handleDeletePopup: (i: string, seconds: number) => void;
}) => {
  let toggleColor = props.state.isGreen;

  const { state, dispatchFn, index, setPopup, handleDeletePopup } = props;

  const id = uuidv4();
  const handleDelete = () => {
    dispatchFn({ type: "DELETE", payload: index });
    setPopup((popupsList) => [...popupsList, { type: "red", text: "Deleted", uuid: id }]);
    handleDeletePopup(id, 1);
  };

  const handleToggle = () => dispatchFn({ type: "TOGGLE", payload: index });

  return (
    <div
      onClick={(_) => handleToggle()}
      className={`${toggleColor ? styles.cardBgGreen : styles.cardBgRed}
     ${styles.card}`}
    >
      <p className={styles.taskPara}> {state.task}</p>
      <button
        onClick={(e) => {
          e.stopPropagation();
          handleDelete();
        }}
        className={styles.delBtn}
      >
        <b>X</b>
      </button>
    </div>
  );
};

export default Card;
