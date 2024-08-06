import { BsCheckLg } from "react-icons/bs";
import styles from "./index.module.scss";
import { useState } from "react";

interface CheckboxProps {
  label: string;
  checked?: boolean;
}

export function Checkbox({ label, checked = false }: CheckboxProps) {
  const [isChecked, setIsChecked] = useState(checked);
  return (
    <div className={styles.checkboxWrapper}>
      <label>
        <input
          type="checkbox"
          checked={isChecked}
          onChange={() => setIsChecked((prev) => !prev)}
          className={isChecked ? styles.checked : ""}
        />
        {isChecked && <BsCheckLg className={styles.checkmark} />}
        <span>{label}</span>
      </label>
    </div>
  );
}
