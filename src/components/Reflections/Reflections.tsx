import styles from "./Reflections.module.css";
import { useState } from "react";
import ReflectionForm from "../ReflectionForm/ReflectionForm";
import Modal from "../Modal/Modal";

function Reflections() {
  const [isFormOpen, setIsFormOpen] = useState(false);

  return (
    <section className={styles.reflections}>
      <h2>Роздуми</h2>

      {!isFormOpen && (
        <button
          className={styles.button}
          type="button"
          onClick={() => setIsFormOpen(true)}
        >
          Поділитися роздумом
        </button>
      )}

      {isFormOpen && (
        <Modal onClose={() => setIsFormOpen(false)}>
          <ReflectionForm onCancel={() => setIsFormOpen(false)} />
        </Modal>
      )}
    </section>
  );
}

export default Reflections;
