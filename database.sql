-- Add status for checked out flights
ALTER TABLE bookings 
ADD COLUMN IF NOT EXISTS flight_status TEXT CHECK (flight_status IN ('pending', 'checked_out', 'checked_in'));

-- Set default value for existing records
UPDATE bookings 
SET flight_status = 'pending' 
WHERE flight_status IS NULL;

-- Make flight_status NOT NULL
ALTER TABLE bookings 
ALTER COLUMN flight_status SET NOT NULL,
ALTER COLUMN flight_status SET DEFAULT 'pending';