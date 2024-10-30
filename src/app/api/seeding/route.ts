import { NextResponse } from "next/server";
import pool from "@/app/utils/postgres"

export async function GET() {
    let data = await fetch(
        `https://data.cityofnewyork.us/resource/gkne-dk5s.json?$limit=100`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    let response = await data.json()
    console.log(response);
    response.map(async (el: any) => {
        await pool.query(
`INSERT INTO trips (
    vendor_id,
    pickup_datetime,
    dropoff_datetime,
    trip_distance,
    pickup_longitude,
    pickup_latitude,
    dropoff_longitude,
    dropoff_latitude,
    payment_type,
    fare_amount,
    total_amount
) VALUES (
    '${el.vendor_id}',
    '${el.pickup_datetime}',
    '${el.dropoff_datetime}',
    '${el.trip_distance}',
    '${el.pickup_longitude}',
    '${el.pickup_latitude}',
    '${el.dropoff_longitude}', 
    '${el.dropoff_latitude}', 
    '${el.payment_type}',
    '${el.fare_amount}',
    '${el.total_amount}'
);`
        )
    })

    return NextResponse.json('done')
}