import styles from "./Reflections.module.css";
import { useState } from "react";
import ReflectionForm from "../ReflectionForm/ReflectionForm";

function Reflections() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className={styles.reflections}>
      <h2>Роздуми</h2>

      <p>Яку думку викликав у вас цей інсайт?</p>

      {!isFormOpen && (
        <button
          className={styles.button}
          type="button"
          onClick={() => setIsFormOpen(true)}
        >
          Поділитися роздумом
        </button>
      )}

      {isFormOpen && <ReflectionForm onCancel={() => setIsFormOpen(false)} />}
    </section>
  );
}

export default Reflections;
