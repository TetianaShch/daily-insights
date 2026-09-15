import styles from "./CalendarStrip.module.css";

const weekdayFormatter = new Intl.DateTimeFormat("uk-UA", {
  weekday: "short",
});

type CalendarStripProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
};

function CalendarStrip({ selectedDate, onDateSelect }: CalendarStripProps) {
  const today = new Date();

  const days = Array.from({ length: 5 }, (_, index) => {
    const date = new Date(today);

    date.setDate(today.getDate() + index - 2);

    return date;
  });

  return (
    <div className={styles.calendar}>
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
