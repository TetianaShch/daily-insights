import styles from "./CalendarStrip.module.css";

const weekdayFormatter = new Intl.DateTimeFormat("uk-UA", {
  weekday: "short",
});

type CalendarStripProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
};

const monthFormatter = new Intl.DateTimeFormat("uk-UA", {
  month: "long",
});

function CalendarStrip({ selectedDate, onDateSelect }: CalendarStripProps) {
  const today = new Date();

  const days = Array.from({ length: 7 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() + index - 3);

    return date;
  });

  return (
    <div className={styles.calendar}>
      <p className={styles.month}>{monthFormatter.format(selectedDate)}</p>
      {days.map((date) => (
        <button
          className={styles.day}
          key={date.toISOString()}
          type="button"
          onClick={() => onDateSelect(date)}
          aria-pressed={date.toDateString() === selectedDate.toDateString()}
          disabled={date > today}
        >
          <span>{weekdayFormatter.format(date).toUpperCase()}</span>

          <span>{String(date.getDate()).padStart(2, "0")}</span>
        </button>
      ))}
    </div>
  );
}

export default CalendarStrip;
