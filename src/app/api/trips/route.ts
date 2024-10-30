import pool from "@/app/utils/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const time = searchParams.get('time')
    const payment = searchParams.get('payment')
    const fare = searchParams.get('fare')
    const distance = searchParams.get('distance')
    let data
    let query = `
            SELECT * 
            FROM trips`

            
    if(payment){
            query += ` WHERE payment_type = '${payment}'`
    }
    
    if (time) {
        if (time === "newest") {
            query += ` ORDER BY pickup_datetime DESC`
        }
        if (time === "oldest") {
            query += ` ORDER BY pickup_datetime ASC`
        }
    }

    if (fare) {
        if (fare === "cheapest") {
            query += ` ORDER BY fare_amount ASC`
        }
        if (fare === "expensive") {
            query += ` ORDER BY fare_amount DESC`
        }
    }

    if (distance) {
        if (distance === "farest") {
            query += ` ORDER BY trip_distance DESC`
        }
        if (distance === "closest") {
            query += ` ORDER BY trip_distance ASC`
        }
    }
    data = await pool.query(query)

    return NextResponse.json(data.rows)
}