import React, { useState } from 'react';
import { useAircraftStore } from '../../store/useAircraftStore';
import AircraftDefects from '../../components/Aircraft/AircraftDefects';
import AircraftFlightHistory from '../../components/Aircraft/AircraftFlightHistory';
import {
  Settings,
  Wrench,
  AlertCircle,
  DollarSign,
  FileText,
  History,
  Cog,
  Gauge,
} from 'lucide-react';

interface AircraftDetailsProps {
  id: string;
}

const TABS = [
  { id: 'details', label: 'Details', icon: Settings },
  { id: 'equipment', label: 'Equipment', icon: Wrench },
  { id: 'defects', label: 'Defects', icon: AlertCircle },
  { id: 'rates', label: 'Charge Rates', icon: DollarSign },
  { id: 'techlog', label: 'Tech Log', icon: FileText },
  { id: 'maintenance', label: 'Maintenance', icon: Cog },
  { id: 'instruments', label: 'Instruments', icon: Gauge },
  { id: 'history', label: 'Flight History', icon: History },
];

const AircraftDetails: React.FC<AircraftDetailsProps> = ({ id }) => {
  const { getAircraft } = useAircraftStore();
  const [activeTab, setActiveTab] = useState('details');
  const aircraft = getAircraft(id);

  if (!aircraft) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'details':
        return (
          // ... existing details content ...
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Opening Values
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-xs text-gray-500">Opening Date</label>
                    <p className="text-sm font-medium">
                      {aircraft.opening_date || 'Not set'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Opening Tacho</label>
                    <p className="text-sm font-medium">
                      {aircraft.opening_tacho || '0'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">
                      Opening Total Time
                    </label>
                    <p className="text-sm font-medium">
                      {aircraft.opening_total_time || '0'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">
                      Opening Tacho Time
                    </label>
                    <p className="text-sm font-medium">
                      {aircraft.opening_tacho_time || '0'}
                    </p>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="text-sm font-medium text-gray-500 mb-2">
                  Current Status
                </h3>
                <div className="bg-gray-50 rounded-lg p-4 space-y-3">
                  <div>
                    <label className="text-xs text-gray-500">Status</label>
                    <p className="text-sm font-medium capitalize">
                      {aircraft.status}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">Total Hours</label>
                    <p className="text-sm font-medium">
                      {aircraft.total_hours || '0'}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">
                      Maintenance Due
                    </label>
                    <p className="text-sm font-medium">
                      {aircraft.maintenance_due || 'Not set'}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <h3 className="text-sm font-medium text-gray-500 mb-2">Settings</h3>
              <div className="bg-gray-50 rounded-lg p-4">
                <div className="grid grid-cols-3 gap-6">
                  <div>
                    <label className="text-xs text-gray-500">Engine Count</label>
                    <p className="text-sm font-medium">{aircraft.engine_count}</p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">
                      Total Time Method
                    </label>
                    <p className="text-sm font-medium">
                      {aircraft.total_time_method}
                    </p>
                  </div>
                  <div>
                    <label className="text-xs text-gray-500">
                      Fuel Consumption
                    </label>
                    <p className="text-sm font-medium">
                      {aircraft.fuel_consumption || '0'} L/hr
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-6 mt-4 pt-4 border-t">
                  <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">
                      Recording Options
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border ${
                            aircraft.record_airswitch
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}
                        />
                        <span className="text-sm">Record Airswitch</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border ${
                            aircraft.record_hobbs
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}
                        />
                        <span className="text-sm">Record Hobbs</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border ${
                            aircraft.record_tacho
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}
                        />
                        <span className="text-sm">Record Tacho</span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <h4 className="text-xs font-medium text-gray-500 mb-2">
                      Availability
                    </h4>
                    <div className="space-y-2">
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border ${
                            aircraft.is_online
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}
                        />
                        <span className="text-sm">Online</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border ${
                            aircraft.for_hire
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}
                        />
                        <span className="text-sm">For Hire</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <div
                          className={`w-4 h-4 rounded border ${
                            aircraft.for_ato
                              ? 'bg-blue-500 border-blue-500'
                              : 'border-gray-300'
                          }`}
                        />
                        <span className="text-sm">For ATO</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        );
      case 'defects':
        return <AircraftDefects aircraftId={id} />;
      case 'history':
        return <AircraftFlightHistory aircraftId={id} />;
      default:
        return (
          <div className="text-center text-gray-500 py-8">
            Content for {activeTab} tab will be implemented soon
          </div>
        );
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-xl shadow-sm border">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-gray-900">
            {aircraft.registration}
          </h2>
          <p className="text-gray-500">{aircraft.type}</p>
        </div>

        <div className="border-t">
          <div className="flex items-center gap-1 p-2 bg-gray-50 overflow-x-auto">
            {TABS.map(({ id: tabId, label, icon: Icon }) => (
              <button
                key={tabId}
                onClick={() => setActiveTab(tabId)}
                className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-md transition-colors whitespace-nowrap
                  ${
                    activeTab === tabId
                      ? 'bg-white text-blue-600 shadow-sm'
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-100'
                  }`}
              >
                <Icon className="h-4 w-4" />
                {label}
              </button>
            ))}
          </div>

          <div className="p-6">{renderTabContent()}</div>
        </div>
      </div>
    </div>
  );
};

export default AircraftDetails;