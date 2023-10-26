"use client";

import { BaseSyntheticEvent, SyntheticEvent, useEffect, useState } from "react";
import styles from "./page.module.css";
import Calendar from "./components/calendar/calendar";
import { TripDays } from "types";

export default function Home() {
  const todayDate = new Date();
  const todayString = todayDate.toISOString();

  const [tripDays, setTripDays] = useState<Array<TripDays> | null>();
  const [route, setRoute] = useState<string>("ALGECEUT");

  useEffect(() => {
    fetch(`/api/tripdays?from=${todayString}&route=${route}`)
      .then((res) => res.json())
      .then(setTripDays);
  }, [route]);

  const handleRoute = (e: BaseSyntheticEvent) => {
    e.preventDefault();
    const option = e.target.value;
    if (option) setRoute(option);
  };

  return (
    <main className={styles.main}>
      <h1>ROUTE: CEUTALGE</h1>
      <form id="form">
        <select
          name="route"
          id="route"
          className={styles.select}
          onChange={handleRoute}
        >
          <option value="ALGECEUT">{`Algeciras => Ceuta`}</option>
          <option value="CEUTALGE">{`Ceuta => Algeciras`}</option>
        </select>
      </form>
      <div className={styles.grid}>
        {tripDays ? (
          <>
            <Calendar data={tripDays[0]} />
            <Calendar data={tripDays[1]} />
          </>
        ) : null}
      </div>
    </main>
  );
}
