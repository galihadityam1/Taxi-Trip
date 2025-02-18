"use client"
import { TaxiTrip } from '@/Types'
import React from 'react'

const TripData = ({ trip, index }: { trip: TaxiTrip, index: number }) => {
    // Set Time format
    const pickupTime: Date = new Date(trip.pickup_datetime);
    const formatedTime = pickupTime.toLocaleString()

    // Set Distance format
    const tripDistance: number = trip.trip_distance;
    const formatDistance = parseFloat(tripDistance.toString());
    return (
        <>
         <tr className="hover:bg-gray-50 transition-colors">
            <th className="text-sm">{index + 1}</th>
            <td className="text-sm">{trip.vendor_id}</td>
            <td className="text-sm">{formatedTime}</td>
            <td className="text-sm">${Number(trip.fare_amount).toFixed(2)}</td>
            <td className="text-sm">{trip.payment_type}</td>
            <td className="text-sm">{formatDistance} miles</td>
        </tr>
        </>
    )
}

export default TripData