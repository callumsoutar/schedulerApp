export type BookingStatus = 'unconfirmed' | 'confirmed' | 'complete' | 'canceled' | 'checked-out';

export interface AircraftDefect {
  id: string;
  aircraft_id: string;
  description: string;
  reported_by: string;
  reported_date: string;
  status: 'open' | 'in_progress' | 'closed';
}

export interface Aircraft {
  id: string;
  registration: string;
  type: string;
  status: string;
  maintenance_due?: string;
  total_hours?: number;
  description?: string;
  opening_date?: string;
  opening_tacho?: number;
  opening_total_time?: number;
  opening_tacho_time?: number;
  engine_count: number;
  record_airswitch: boolean;
  record_hobbs: boolean;
  record_tacho: boolean;
  total_time_method: 'Tacho' | 'Tacho Less 10%';
  is_online: boolean;
  for_hire: boolean;
  for_ato: boolean;
  fuel_consumption?: number;
  created_at?: string;
  updated_at?: string;
}

export interface Booking {
  id: string;
  startDate: string;
  endDate: string;
  instructorId?: string;
  memberId?: string;
  aircraftId?: string;
  status: BookingStatus;
  maintenance: boolean;
  comments?: string;
  flightType?: string;
  created_at?: string;
  updated_at?: string;
}

export interface Staff {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  role?: string;
  qualifications?: string[];
  created_at?: string;
  updated_at?: string;
}

export interface Member {
  id: string;
  name: string;
  email: string;
  phone?: string;
  status: string;
  created_at?: string;
  updated_at?: string;
}

export type ResourceType = 'staff' | 'aircraft';
export type TotalTimeMethod = 'Tacho' | 'Tacho Less 10%';