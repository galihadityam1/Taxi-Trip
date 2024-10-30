export interface TaxiTrip {
  vendor_id: string,
  pickup_datetime: string;
  dropoff_datetime: string;
  pickup_longitude: number;
  pickup_latitude: number;
  dropoff_longitude: number;
  dropoff_latitude: number;
  fare_amount: number;
  trip_distance: number;
  payment_type: string;
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