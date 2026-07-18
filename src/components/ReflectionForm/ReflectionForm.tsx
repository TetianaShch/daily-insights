import { ErrorMessage, Field, Form, Formik, type FormikHelpers } from "formik";
import * as Yup from "yup";
import styles from "./ReflectionForm.module.css";
import { createReflection } from "../../services/reflectionsApi";
import type { Reflection } from "../../types/reflection";

type ReflectionFormValues = {
  nickname: string;
  accessKey: string;
  text: string;
};

interface ReflectionFormProps {
  insightId: string;
  onCancel: () => void;
  onCreated: (reflection: Reflection) => void;
}

const initialValues: ReflectionFormValues = {
  nickname: "",
  accessKey: "",
  text: "",
};

const validationSchema = Yup.object({
  nickname: Yup.string()
    .trim()
    .min(3, "Нік має містити щонайменше 3 символи")
    .max(12, "Нік може містити не більше 12 символів")
    .matches(/^[a-zA-Z0-9]+$/, "Використовуйте лише латинські літери та цифри")
    .required("Вкажіть нік, будь ласка"),

  accessKey: Yup.string().required("Вкажіть ключ доступу, будь ласка"),

  text: Yup.string()
    .trim()
    .min(10, "Роздум має містити щонайменше 10 символів")
    .max(1000, "Роздум може містити не більше 1000 символів")
    .required("Напишіть свій роздум"),
});

function ReflectionForm({
  insightId,
  onCancel,
  onCreated,
}: ReflectionFormProps) {
  const handleSubmit = async (
    values: ReflectionFormValues,
    {
      resetForm,
      setStatus,
      setSubmitting,
    }: FormikHelpers<ReflectionFormValues>,
  ) => {
    try {
      setStatus("");

      const reflection = await createReflection({
        insightId,
        nickname: values.nickname.trim(),
        text: values.text.trim(),
        accessCode: values.accessKey,
      });

      onCreated(reflection);
      resetForm();
      onCancel();
    } catch (error) {
      setStatus(
        error instanceof Error
          ? error.message
          : "Не вдалося опублікувати роздум.",
      );
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <>
      <h2 className={styles.title}>Поділитися роздумом</h2>

      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        {({ isSubmitting, status }) => (
          <Form className={styles.form}>
            <label className={styles.field}>
              <span className={styles.label}>Нік</span>

              <Field
                className={styles.input}
                type="text"
                name="nickname"
                placeholder="Наприклад, marta7"
              />

              <ErrorMessage
                className={styles.error}
                name="nickname"
                component="span"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Ключ доступу</span>

              <Field
                className={styles.input}
                type="password"
                name="accessKey"
                autoComplete="off"
              />

              <ErrorMessage
                className={styles.error}
                name="accessKey"
                component="span"
              />
            </label>

            <label className={styles.field}>
              <span className={styles.label}>Роздум</span>

              <Field
                className={styles.textarea}
                name="text"
                as="textarea"
                rows={6}
                placeholder="Поділіться своєю думкою..."
              />

              <ErrorMessage
                className={styles.error}
                name="text"
                component="span"
              />
            </label>

            {status && <p className={styles.error}>{status}</p>}

            <div className={styles.actions}>
              <button
                className={styles.submitButton}
                type="submit"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Публікуємо..." : "Опублікувати"}
              </button>

              <button
                className={styles.cancelButton}
                type="button"
                onClick={onCancel}
                disabled={isSubmitting}
              >
                Скасувати
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
}

export default ReflectionForm;
