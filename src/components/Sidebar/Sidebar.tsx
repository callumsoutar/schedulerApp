import React from 'react';
import { NavLink } from 'react-router-dom';
import { Menu, Users, Plane, CalendarClock, LayoutDashboard } from 'lucide-react';

const Sidebar = () => {
  return (
    <div className="w-64 bg-gray-900 text-white h-screen fixed left-0 top-0">
      <div className="p-4">
        <h1 className="text-xl font-bold flex items-center gap-2">
          <Plane className="h-6 w-6" />
          AeroScheduler
        </h1>
      </div>
      
      <nav className="mt-8">
        <SidebarLink to="/dashboard" icon={<LayoutDashboard />} text="Dashboard" />
        <SidebarLink to="/schedule" icon={<CalendarClock />} text="Schedule" />
        <SidebarLink to="/aircraft" icon={<Plane />} text="Aircraft" />
        <SidebarLink to="/staff" icon={<Users />} text="Staff" />
        <SidebarLink to="/members" icon={<Menu />} text="Members" />
      </nav>
    </div>
  );
};

const SidebarLink = ({ to, icon, text }: { to: string; icon: React.ReactNode; text: string }) => (
  <NavLink
    to={to}
    className={({ isActive }) =>
      `flex items-center gap-3 px-6 py-3 text-gray-300 hover:bg-gray-800 hover:text-white transition-colors ${
        isActive ? 'bg-gray-800 text-white border-l-4 border-blue-500' : ''
      }`
    }
  >
    {icon}
    <span>{text}</span>
  </NavLink>
);

export default Sidebar;