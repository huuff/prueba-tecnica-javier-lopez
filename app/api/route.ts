import { NextRequest, NextResponse } from "next/server"
import dayjs from 'dayjs'

import { Trip } from "types"
import { connectDB } from "../db/mongodb"
import { TripDays } from "../db/models/TripDays"



export async function GET(request: NextRequest) {
	const params: URLSearchParams = request.nextUrl.searchParams

	const route: string | null = params.get('route')

	const fromDate: string | null = params.get('from')

	const dateObj1 = dayjs(fromDate)	// D = dia, d+1 = diasemana, M+1 = mes, y = año
	const year1 = dateObj1.year()
	const month1 = dateObj1.month()+1
	const daysInMonth1 = dateObj1.daysInMonth()

	const dateObj2 = dateObj1.add(1,'month')
	const year2 = dateObj2.year()
	const month2 = dateObj2.month()+1
	const daysInMonth2 = dateObj2.daysInMonth()
	
	console.log(dateObj1,dateObj2)

	connectDB()

	const month1Exists = await TripDays.findOne({route:route,year: year1,month: month1 })

	console.log("Month1 exists?", month1Exists)

	if(!month1Exists){
		const days = []
		for (let i=1;i<=daysInMonth1;i++){
			const time = `${year1}-${month1}-${i}`
			console.log("checking",time)
			const url = `https://tadpole.clickferry.app/departures?route=${route}&time=${time}`
			const res = await fetch(url)
			const trips: Array<Trip> = await res.json()
			if(trips.length){
				days.push(i)
			}
		}
		TripDays.create({
			route:route,
			year:year1,
			month:month1,
			days:days
		})
		console.log("Created month1 in MongoDB")
	}
	
	
	const month2Exists = await TripDays.findOne({route:route,year: year2,month: month2 })

	console.log("Month2 exists?", month2Exists)

	if(!month2Exists){
		const days = []
		for (let i=1;i<=daysInMonth2;i++){
			const time = `${year2}-${month2}-${i}`
			console.log("checking",time)
			const url = `https://tadpole.clickferry.app/departures?route=${route}&time=${time}`
			const res = await fetch(url)
			const trips: Array<Trip> = await res.json()
			if(trips.length){
				days.push(i)
			}
		}
		TripDays.create({
			route:route,
			year:year2,
			month:month2,
			days:days
		})

		console.log("Created month2 in MongoDB")
	}

	return NextResponse.json([month1Exists,month2Exists])

}
