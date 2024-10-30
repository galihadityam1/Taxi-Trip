"use client"
import { TaxiTrip } from '@/Types'
import React from 'react'
import TripData from './TripData'
import Link from 'next/link'

const TableTrips = ({ data }: any) => {
    let href = '?filter=m_eq'
    return (
        <div className="container mx-auto p-4">
            <div className="overflow-x-auto border">
                <div className="max-h-[740px]">
                    <table className="table table-pin-rows">
                        <thead className="sticky top-0 z-10 border-b">
                            <tr className="text-sm text-gray-400">
                                <th className="bg-white">#</th>
                                <th className="bg-white">Vendor</th>
                                <th className="bg-white">
                                    <details className="dropdown">
                                        <summary className="bg-white hover:bg-gray cursor-pointer">Trip Time</summary>
                                        <ul className="menu dropdown-content bg-gray-100 rounded-box z-[1] w-52 shadow">
                                            <li><Link href={href + '&time=newest'}>Newest</Link></li>
                                            <li><Link href={href + '&time=oldest'}>Oldest</Link></li>
                                        </ul>
                                    </details>
                                </th>
                                <th className="bg-white">
                                    <details className="dropdown">
                                        <summary className="bg-white hover:bg-gray cursor-pointer">Fare</summary>
                                        <ul className="menu dropdown-content bg-gray-100 rounded-box z-[1] w-52 shadow">
                                            <li><Link href={href + '&fare=cheapest'}>Cheapest</Link></li>
                                            <li><Link href={href + '&fare=expensive'}>Expensive</Link></li>
                                        </ul>
                                    </details>
                                </th>
                                <th className="bg-white">
                                <details className="dropdown">
                                        <summary className="bg-white hover:bg-gray cursor-pointer">Payment</summary>
                                        <ul className="menu dropdown-content bg-gray-100 rounded-box z-[1] w-52 shadow">
                                            <li><Link href={href + "&payment=CRD"}>CRD</Link></li>
                                            <li><Link href={href + '&payment=CSH'}>CSH</Link></li>
                                        </ul>
                                    </details>
                                    </th>
                                <th className="bg-white">
                                <details className="dropdown">
                                        <summary className="bg-white hover:bg-gray cursor-pointer">Distance Trip</summary>
                                        <ul className="menu dropdown-content bg-gray-100 rounded-box z-[1] w-52 shadow">
                                            <li><Link href={href + '&distance=farest'}>Farest</Link></li>
                                            <li><Link href={href + '&distance=closest'}>Closest</Link></li>
                                        </ul>
                                    </details></th>
                            </tr>
                        </thead>
                        <tbody>
                            {data && data.map((trip: TaxiTrip, i: number) => (
                                <TripData trip={trip} key={i} index={i} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    )
}

export default TableTrips