import { NextResponse } from "next/server";
import { supabase } from "@/app/lib/supabaseClient";
import { TaxiTrip } from "@/Types";

export async function GET() {
    const data = await fetch(
        `https://data.cityofnewyork.us/resource/gkne-dk5s.json?$limit=100`, {
        headers: {
            'Content-Type': 'application/json'
        }
    });

    const response = await data.json()

    response.map(async (el: TaxiTrip) => {
        const { error } = await supabase
            .from('trips')
            .insert(
                {
                    vendor_id: el.vendor_id,
                    pickup_datetime: el.pickup_datetime,
                    dropoff_datetime: el.dropoff_datetime,
                    trip_distance: Number(el.trip_distance),
                    pickup_longitude: Number(el.pickup_longitude),
                    pickup_latitude: Number(el.pickup_latitude),
                    dropoff_longitude: Number(el.dropoff_longitude),
                    dropoff_latitude: Number(el.dropoff_latitude),
                    payment_type: el.payment_type,
                    fare_amount: Number(el.fare_amount),
                    total_amount: Number(el.total_amount)
                }
            );

        if (error) NextResponse.json(error)
    })

    return NextResponse.json({ message: 'done' })
}