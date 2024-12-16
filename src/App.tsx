import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar/Sidebar';
import DashboardPage from './pages/Dashboard/DashboardPage';
import Schedule from './components/Schedule/Schedule';
import AircraftPage from './pages/Aircraft/AircraftPage';
import StaffPage from './pages/Staff/StaffPage';
import MembersPage from './pages/Members/MembersPage';
import MemberDetailsPage from './pages/Members/MemberDetailsPage';
import BookingDetailsPage from './pages/Bookings/BookingDetailsPage';
import EditBookingPage from './pages/Bookings/EditBookingPage';
import CheckOutPage from './pages/Flights/CheckOutPage';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <Sidebar />
        <div className="pl-64">
          <Routes>
            <Route path="/" element={<Navigate to="/dashboard" replace />} />
            <Route path="/dashboard" element={<DashboardPage />} />
            <Route path="/schedule" element={<Schedule />} />
            <Route path="/aircraft" element={<AircraftPage />} />
            <Route path="/staff" element={<StaffPage />} />
            <Route path="/members" element={<MembersPage />} />
            <Route path="/members/:id" element={<MemberDetailsPage />} />
            <Route path="/bookings/:id" element={<BookingDetailsPage />} />
            <Route path="/bookings/:id/edit" element={<EditBookingPage />} />
            <Route path="/flights/checkout/:id" element={<CheckOutPage />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;