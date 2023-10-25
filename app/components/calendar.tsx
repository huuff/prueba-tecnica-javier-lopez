'use client'

import dayjs from 'dayjs'

import { TripDays } from 'types'

import styles from './calendar.module.css'

const dayToString = {
    0: "Lun",
    1: "Mar",
    2: "Mie",
    3: "Jue",
    4: "Vie",
    5: "Sab",
    6: "Dom"
}

interface Props {
    data: TripDays
}
export default function Calendar(props:Props) {
    const { data } = props
    const { route, year, month, days } = data

    const dateObj = dayjs(`${year}-${month}-1`)

    const firstDayEN = dateObj.day()
    const firstDay = firstDayEN === 0 ? 6: firstDayEN - 1

    const calendarDays = Array(6-firstDayEN).fill(0).concat(Array.from(Array(dateObj.daysInMonth())).map((e,i)=>i+1))
    console.log(calendarDays)


  return (
    <div className={styles.calendar_grid}>
        {calendarDays.map((day,i)=> {
           return <div key={`${year}${month}${i}`}
            className={`${styles.calendar_day} 
            ${!days.includes(day)?styles.disabled:''} 
            ${day===0?styles.empty:''} 
            `}>
           <span>{day===0?"":day}</span>
           </div>
        })}

    </div>
  )
}
