-- Insert sample aircraft
INSERT INTO aircraft (registration, type, status, maintenance_due, total_hours, description, 
                     opening_date, opening_tacho, opening_total_time, opening_tacho_time,
                     engine_count, record_airswitch, record_hobbs, record_tacho,
                     total_time_method, is_online, for_hire, for_ato, fuel_consumption)
VALUES 
  ('ZK-ABC', 'Cessna 172', 'active', DATE '2024-06-01', 3450.5, 'Primary training aircraft', 
   DATE '2023-01-01', 3400.0, 3450.5, 3400.0,
   1, false, true, true, 'Tacho', true, true, true, 35),
  ('ZK-XYZ', 'Piper PA-28', 'active', DATE '2024-07-15', 2800.2, 'Cross-country trainer',
   DATE '2023-02-15', 2750.0, 2800.2, 2750.0,
   1, false, true, true, 'Tacho', true, true, false, 40);

-- Insert sample staff
INSERT INTO staff (name, email, phone, status, role, qualifications)
VALUES 
  ('John Smith', 'john.smith@example.com', '+64 21 555 0101', 'active', 'Chief Flight Instructor', 
   ARRAY['CPL', 'MEIR', 'FI']),
  ('Sarah Wilson', 'sarah.wilson@example.com', '+64 21 555 0102', 'active', 'Flight Instructor',
   ARRAY['CPL', 'FI']),
  ('Mike Johnson', 'mike.johnson@example.com', '+64 21 555 0103', 'active', 'Ground Instructor',
   ARRAY['CPL', 'GI']);

-- Insert sample members
INSERT INTO members (name, email, phone, status)
VALUES 
  ('David Brown', 'david.brown@example.com', '+64 21 555 0201', 'active'),
  ('Emma Davis', 'emma.davis@example.com', '+64 21 555 0202', 'active'),
  ('James Wilson', 'james.wilson@example.com', '+64 21 555 0203', 'active');

-- Insert sample bookings
INSERT INTO bookings (start_date, end_date, instructor_id, member_id, aircraft_id, status, maintenance, comments)
SELECT 
  NOW() + interval '1 day' + interval '9 hours',
  NOW() + interval '1 day' + interval '11 hours',
  (SELECT id FROM staff WHERE name = 'John Smith'),
  (SELECT id FROM members WHERE name = 'David Brown'),
  (SELECT id FROM aircraft WHERE registration = 'ZK-ABC'),
  'confirmed',
  false,
  'Initial training flight'
UNION ALL
SELECT 
  NOW() + interval '2 days' + interval '13 hours',
  NOW() + interval '2 days' + interval '15 hours',
  (SELECT id FROM staff WHERE name = 'Sarah Wilson'),
  (SELECT id FROM members WHERE name = 'Emma Davis'),
  (SELECT id FROM aircraft WHERE registration = 'ZK-XYZ'),
  'unconfirmed',
  false,
  'Cross-country training'
UNION ALL
SELECT 
  NOW() + interval '1 day' + interval '14 hours',
  NOW() + interval '1 day' + interval '16 hours',
  NULL,
  NULL,
  (SELECT id FROM aircraft WHERE registration = 'ZK-ABC'),
  'confirmed',
  true,
  '100-hour inspection';

-- Insert sample aircraft equipment
INSERT INTO aircraft_equipment (aircraft_id, name, description, installation_date)
SELECT 
  id,
  'Garmin G1000',
  'Integrated flight deck system',
  DATE '2023-01-01'
FROM aircraft 
WHERE registration = 'ZK-ABC'
UNION ALL
SELECT 
  id,
  'KAP 140',
  'Autopilot system',
  DATE '2023-02-15'
FROM aircraft
WHERE registration = 'ZK-XYZ';

-- Insert sample aircraft defects
INSERT INTO aircraft_defects (aircraft_id, description, reported_by, status)
SELECT 
  (SELECT id FROM aircraft WHERE registration = 'ZK-ABC'),
  'Minor oil leak observed',
  (SELECT id FROM staff WHERE name = 'John Smith'),
  'open';

-- Insert sample charge rates
INSERT INTO aircraft_charge_rates (aircraft_id, rate_type, rate_amount, effective_from)
SELECT 
  id,
  'Wet Rate',
  350.00,
  DATE '2024-01-01'
FROM aircraft
WHERE registration = 'ZK-ABC'
UNION ALL
SELECT 
  id,
  'Wet Rate',
  380.00,
  DATE '2024-01-01'
FROM aircraft
WHERE registration = 'ZK-XYZ';