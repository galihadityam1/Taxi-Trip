import { supabase } from "@/app/lib/supabaseClient";
import pool from "@/app/utils/postgres";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
    const { searchParams } = new URL(request.url);
    const time = searchParams.get('time')
    const payment = searchParams.get('payment')
    const fare = searchParams.get('fare')
    const distance = searchParams.get('distance')
    let pass = []

    if(!time && !payment && !fare && !distance){
        const { data, error }: any = await supabase
            .from('trips')
            .select('*')
        if (error) return NextResponse.json(error)
        pass = data
    }

    if (payment) {
        const { data, error } = await supabase
            .from('trips')
            .select("*")
            .eq('payment_type', payment)
        if (error) return NextResponse.json(error)
        pass = data
    }

    if (time) {
        if (time === "newest") {
            const { data, error } = await supabase
            .from('trips')
            .select("*")
            .order('pickup_datetime', { ascending: false })
        if (error) return NextResponse.json(error)
        pass = data
        }
        if (time === "oldest") {
            const { data, error } = await supabase
            .from('trips')
            .select("*")
            .order('pickup_datetime', { ascending: true })
        if (error) return NextResponse.json(error)
        pass = data
        }
    }

    if (fare) {
        if (fare === "expensive") {
            const { data, error } = await supabase
            .from('trips')
            .select("*")
            .order('fare_amount', { ascending: false })
        if (error) return NextResponse.json(error)
        pass = data
        }
        if (fare === "cheapest") {
            const { data, error } = await supabase
            .from('trips')
            .select("*")
            .order('fare_amount', { ascending: true })
        if (error) return NextResponse.json(error)
        pass = data
        }
    }

    if (distance) {
        if (distance === "farest") {
            const { data, error } = await supabase
            .from('trips')
            .select("*")
            .order('trip_distance', { ascending: false })            
        if (error) return NextResponse.json(error)
        pass = data
        }
        if (distance === "closest") {
            const { data, error } = await supabase
            .from('trips')
            .select("*")
            .order('trip_distance', { ascending: true })
        if (error) return NextResponse.json(error)
        pass = data
        }
    }

    console.log(pass);
    
    return NextResponse.json(pass)
}