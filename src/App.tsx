import React, { useReducer, useRef, useState } from "react";
import styles from "./App.module.css";
import Card from "./components/Card";
import Form from "./components/Form";
import Popup from "./components/Popup";
import { type Props } from "./components/Popup";
import { v4 as idGenerator } from "uuid";

export type TaskProp = {
  task: string;
  isGreen: boolean;
};

export type State = TaskProp[];

const EmptyMessage = () => {
  return (
    <div className={styles.emptyMsgDiv}>
      <h3 className={styles.p1}>No current tasks remaining ✅ </h3>
      <h4 className={styles.p2}>Try adding some...</h4>
    </div>
  );
};

export type Action = { type: "ADD"; payload: string } | { type: "TOGGLE"; payload: number } | { type: "DELETE"; payload: number };

export default function App() {
  const [state, dispatch] = useReducer(reducer, []);
  const [popup, setPopup] = useState<Props[]>([]);
  const inputRef = useRef<HTMLInputElement>(null);

  const handlePopupDeleteTimer = (id: string, seconds: number) => {
    setTimeout(() => {
      setPopup((p) => p.filter((e) => e.uuid !== id));
    }, seconds * 1000);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    const val = inputRef.current?.value.trim();
    const u = idGenerator();
    if (val) {
      if (val.length < 75) {
        dispatch({ type: "ADD", payload: val });
        setPopup([...popup, { uuid: u, type: "green", text: "Added task!" }]);
        handlePopupDeleteTimer(u, 1);
      } else {
        setPopup([...popup, { type: "red", text: "Too big!", uuid: u }]);
        handlePopupDeleteTimer(u, 1);
      }
    }
    inputRef.current!.value = "";
  };

  const Cards = () => {
    return (
      <>
        {state.map((e, i) => (
          <Card index={i} setPopup={setPopup} dispatchFn={dispatch} key={idGenerator()} state={e} handleDeletePopup={handlePopupDeleteTimer} />
        ))}
      </>
    );
  };

  return (
    <div className={styles.main}>
      <div className={styles.formWrapper}>
        <Form handleSubmit={handleSubmit} inputRef={inputRef} />
      </div>

      <div className={styles.container}>{state.length === 0 ? <EmptyMessage /> : <Cards />}</div>

      <div className={`${styles.modal} ${popup.length > 3 ? styles.fadeMask : ""}`}>
        {popup.map((e) => {
          return (
            <>
              <Popup type={e.type} text={e.text} uuid={e.uuid} />
            </>
          );
        })}
      </div>
    </div>
  );
}

const reducer = (prevState: State, action: Action): State => {
  switch (action.type) {
    case "ADD":
      const newObj: TaskProp = {
        task: action.payload,
        isGreen: false,
      };
      return [...prevState, newObj];
    case "TOGGLE":
      return prevState.map((item, idx) => (idx !== action.payload ? item : { ...item, isGreen: !item.isGreen }));
    case "DELETE":
      return prevState.filter((_, idx) => idx !== action.payload);
    default:
      return prevState;
  }
};
