import type { Ref } from "react";
import styles from "./Form.module.css";

type Props = {
  handleSubmit: (e: React.FormEvent<HTMLFormElement>) => void;
  inputRef: Ref<HTMLInputElement>;
};

export default function Form({ handleSubmit, inputRef }: Props) {
  return (
    <form onSubmit={handleSubmit} className={styles.formElement}>
      <input ref={inputRef} required className={styles.inputBox} placeholder="Add task.." type="text" />
      <button type="submit" className={styles.addBtn}>
        📌 Add
      </button>
    </form>
  );
}
