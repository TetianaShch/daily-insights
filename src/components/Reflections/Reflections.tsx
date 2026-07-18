import { useEffect, useState } from "react";
import styles from "./Reflections.module.css";
import ReflectionForm from "../ReflectionForm/ReflectionForm";
import Modal from "../Modal/Modal";
import { fetchReflections } from "../../services/reflectionsApi";
import type { Reflection } from "../../types/reflection";

interface ReflectionsProps {
  insightId: string;
}

function Reflections({ insightId }: ReflectionsProps) {
  const [isFormOpen, setIsFormOpen] = useState(false);
  const [reflections, setReflections] = useState<Reflection[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const loadReflections = async () => {
      try {
        setIsLoading(true);
        setError("");

        const data = await fetchReflections(insightId);
        setReflections(data);
      } catch {
        setError("Не вдалося завантажити роздуми.");
      } finally {
        setIsLoading(false);
      }
    };

    loadReflections();
  }, [insightId]);

  const handleCreated = (reflection: Reflection) => {
    setReflections((currentReflections) => [reflection, ...currentReflections]);
  };

  return (
    <section className={styles.reflections}>
      <h2>Роздуми</h2>

      {isLoading && <p>Завантаження...</p>}

      {error && <p>{error}</p>}

      {!isLoading && !error && reflections.length === 0 && (
        <p>Поки що роздумів немає.</p>
      )}

      {!isLoading &&
        !error &&
        reflections.map((reflection) => (
          <article key={reflection.id}>
            <strong>{reflection.nickname}</strong>
            <p>{reflection.text}</p>
          </article>
        ))}

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
          <ReflectionForm
            insightId={insightId}
            onCancel={() => setIsFormOpen(false)}
            onCreated={handleCreated}
          />
        </Modal>
      )}
    </section>
  );
}

export default Reflections;
