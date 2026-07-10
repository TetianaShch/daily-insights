import { ErrorMessage, Field, Form, Formik } from "formik";
import * as Yup from "yup";
import styles from "./ReflectionForm.module.css";

type ReflectionFormValues = {
  nickname: string;
  accessKey: string;
  text: string;
};

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
    .required("Введіть нік"),

  accessKey: Yup.string().required("Введіть ключове слово"),

  text: Yup.string()
    .trim()
    .min(10, "Роздум має містити щонайменше 10 символів")
    .max(1000, "Роздум може містити не більше 1000 символів")
    .required("Напишіть свій роздум"),
});

function ReflectionForm({ onCancel }: { onCancel: () => void }) {
  const handleSubmit = (
    values: ReflectionFormValues,
    { resetForm }: { resetForm: () => void },
  ) => {
    console.log(values);

    resetForm();
  };

  return (
    <Formik
      initialValues={initialValues}
      validationSchema={validationSchema}
      onSubmit={handleSubmit}
    >
      <Form className={styles.form}>
        <label className={styles.field}>
          <span className={styles.label}>Ваш нік</span>

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
          <span className={styles.label}>Ключове слово</span>

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
          <span className={styles.label}>Ваш роздум</span>

          <Field
            className={styles.textarea}
            name="text"
            as="textarea"
            rows={6}
            placeholder="Поділіться думкою, яку викликав цей інсайт"
          />

          <ErrorMessage className={styles.error} name="text" component="span" />
        </label>

        <button className={styles.button} type="submit">
          Опублікувати
        </button>
        <button className={styles.button} type="button" onClick={onCancel}>
          Скасувати
        </button>
      </Form>
    </Formik>
  );
}

export default ReflectionForm;
