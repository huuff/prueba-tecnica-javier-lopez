'use client'

import { useEffect, useState } from 'react'
import styles from './page.module.css'
import Calendar from './components/calendar/calendar'
import { TripDays } from 'types'


export default function Home() {

  const todayDate = new Date()
  const todayString = todayDate.toISOString()

  const [tripDays,setTripDays] = useState<Array<TripDays>|null>()

  useEffect(() => {
    fetch(`/api/tripdays?from=${todayString}&route=ALGECEUT`)
      .then(res=>res.json())
      .then(setTripDays)
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [])
  

  return (
    <main className={styles.main}>
       <h1>ROUTE: CEUTALGE </h1>
       <div className={styles.grid}>
        {
        tripDays?
        <>
          <Calendar data={ tripDays[0] }/>
          <Calendar data={ tripDays[1] }/>
        </>
        :null
        }
     </div> 
    </main>
  )
}
