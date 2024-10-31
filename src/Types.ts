export interface TaxiTrip {
  vendor_id: string,
  pickup_datetime: Date;
  dropoff_datetime: Date;
  pickup_longitude: number;
  pickup_latitude: number;
  dropoff_longitude: number;
  dropoff_latitude: number;
  fare_amount: number;
  trip_distance: number;
  payment_type: string;
  total_amount: string
}

export interface FilterState {
  dateRange: {
    from: Date;
    to: Date;
  };
  fareRange: [number, number];
  distanceRange: [number, number];
  paymentType: string;
}

export type params = {
  time: string | null,
  fare: string | null,
  distance: string | null,
  payment: string | null
} | null;