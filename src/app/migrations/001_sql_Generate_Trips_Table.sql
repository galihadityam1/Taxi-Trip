CREATE TABLE trips (
    id SERIAL PRIMARY KEY,
    vendor_id VARCHAR(10),
    pickup_datetime TIMESTAMP,
    dropoff_datetime TIMESTAMP,
    trip_distance NUMERIC(5, 2),
    pickup_longitude NUMERIC(10, 6),
    pickup_latitude NUMERIC(10, 6),
    dropoff_longitude NUMERIC(10, 6),
    dropoff_latitude NUMERIC(10, 6),
    payment_type VARCHAR(10),
    fare_amount NUMERIC(10, 2),
    total_amount NUMERIC(10, 2)
);
