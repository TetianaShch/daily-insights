import { useState } from "react";
import styles from "./FlowerBurst.module.css";
import FlowerIcon from "../FlowerIcon/FlowerIcon";

function FlowerBurst() {
  const [isBlooming, setIsBlooming] = useState(false);

  const handleClick = () => {
    setIsBlooming(true);

    setTimeout(() => {
      setIsBlooming(false);
    }, 1000);
  };

  return (
    <span className={styles.wrapper}>
      <button className={styles.flower} onClick={handleClick} type="button">
        <FlowerIcon />
      </button>

      {isBlooming && (
        <>
          <span className={`${styles.petal} ${styles.petal1}`}>✿</span>
          <span className={`${styles.petal} ${styles.petal2}`}>✿</span>
          <span className={`${styles.petal} ${styles.petal3}`}>✿</span>
          <span className={`${styles.petal} ${styles.petal4}`}>✿</span>
          <span className={`${styles.petal} ${styles.petal5}`}>✿</span>
        </>
      )}
    </span>
  );
}

export default FlowerBurst;
