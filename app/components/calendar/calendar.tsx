"use client";

import dayjs from "dayjs";

import { TripDays } from "types";

import styles from "./calendar.module.css";

interface Props {
  data: TripDays;
}
export default function Calendar(props: Props) {
  const { data } = props;
  const { route, year, month, days } = data;

  const dateObj = dayjs(`${year}-${month}-1`);

  const firstDayEN = dateObj.day();
  const firstDay = firstDayEN === 0 ? 6 : firstDayEN - 1;

  const calendarDays = Array(6 - firstDayEN)
    .fill(0)
    .concat(Array.from(Array(dateObj.daysInMonth())).map((e, i) => i + 1));
  console.log(calendarDays);

  return (
    <div className={styles.calendar_grid}>
      <div className={styles.weekday}>Lun</div>
      <div className={styles.weekday}>Mar</div>
      <div className={styles.weekday}>Mier</div>
      <div className={styles.weekday}>Jue</div>
      <div className={styles.weekday}>Vie</div>
      <div className={styles.weekday}>Sab</div>
      <div className={styles.weekday}>Dom</div>

      {calendarDays.map((day, i) => {
        return (
          <div
            key={`${year}${month}${i}`}
            className={`${styles.calendar_day} 
            ${!days.includes(day) ? styles.disabled : ""} 
            ${day === 0 ? styles.empty : ""} 
            `}
          >
            <span>{day === 0 ? "" : day}</span>
          </div>
        );
      })}
    </div>
  );
}
