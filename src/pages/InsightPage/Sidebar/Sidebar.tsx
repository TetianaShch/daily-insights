import CalendarStrip from "../../../components/CalendarStrip/CalendarStrip";

import styles from "./Sidebar.module.css";

type SidebarProps = {
  selectedDate: Date;
  onDateSelect: (date: Date) => void;
};

function Sidebar({ selectedDate, onDateSelect }: SidebarProps) {
  return (
    <aside className={styles.sidebar}>
      <CalendarStrip selectedDate={selectedDate} onDateSelect={onDateSelect} />
    </aside>
  );
}

export default Sidebar;
