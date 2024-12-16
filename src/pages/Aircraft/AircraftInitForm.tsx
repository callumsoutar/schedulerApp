import React, { useState } from 'react';
import { useAircraftStore } from '../../store/useAircraftStore';
import type { TotalTimeMethod } from '../../types';
import { Plane, Info } from 'lucide-react';

interface AircraftInitFormProps {
  onSuccess: () => void;
  onCancel: () => void;
}

const AircraftInitForm: React.FC<AircraftInitFormProps> = ({
  onSuccess,
  onCancel,
}) => {
  const { createAircraft } = useAircraftStore();
  const [formData, setFormData] = useState({
    registration: '',
    type: '',
    opening_date: '',
    opening_tacho: '',
    opening_total_time: '',
    opening_tacho_time: '',
    engine_count: 1,
    record_airswitch: false,
    record_hobbs: true,
    record_tacho: false,
    total_time_method: 'Tacho' as TotalTimeMethod,
    is_online: true,
    for_hire: true,
    for_ato: false,
    fuel_consumption: 0,
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    await createAircraft({
      ...formData,
      opening_tacho: Number(formData.opening_tacho),
      opening_total_time: Number(formData.opening_total_time),
      opening_tacho_time: Number(formData.opening_tacho_time),
      status: 'active',
    });
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 space-y-8">
      {/* Header Info */}
      <div className="bg-gradient-to-r from-blue-50 to-blue-100 p-6 rounded-xl flex items-start gap-4 shadow-sm">
        <div className="bg-white p-3 rounded-lg shadow-sm">
          <Plane className="h-6 w-6 text-blue-600" />
        </div>
        <div>
          <h3 className="text-lg font-semibold text-blue-900">
            New Aircraft Registration
          </h3>
          <p className="text-sm text-blue-700 mt-1">
            Enter the initial details and settings for the aircraft. All fields
            marked with * are required.
          </p>
        </div>
      </div>

      {/* Basic Information */}
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Basic Information
          </h3>
          <div className="group relative">
            <Info className="h-4 w-4 text-gray-400" />
            <div className="hidden group-hover:block absolute left-full ml-2 p-2 bg-gray-800 text-white text-xs rounded w-48">
              Enter the aircraft's registration and type details
            </div>
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Registration <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., ZK-ABC"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              value={formData.registration}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  registration: e.target.value.toUpperCase(),
                })
              }
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Aircraft Type <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              required
              placeholder="e.g., Cessna 172"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              value={formData.type}
              onChange={(e) =>
                setFormData({ ...formData, type: e.target.value })
              }
            />
          </div>
        </div>
      </div>

      {/* Opening Values */}
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">
            Opening Values
          </h3>
          <div className="group relative">
            <Info className="h-4 w-4 text-gray-400" />
            <div className="hidden group-hover:block absolute left-full ml-2 p-2 bg-gray-800 text-white text-xs rounded w-48">
              Record the initial readings and date for this aircraft
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Opening Date <span className="text-red-500">*</span>
            </label>
            <input
              type="date"
              required
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              value={formData.opening_date}
              onChange={(e) =>
                setFormData({ ...formData, opening_date: e.target.value })
              }
            />
          </div>

          <div className="grid grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tacho <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="0.0"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                value={formData.opening_tacho}
                onChange={(e) =>
                  setFormData({ ...formData, opening_tacho: e.target.value })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Total Time <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="0.0"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                value={formData.opening_total_time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    opening_total_time: e.target.value,
                  })
                }
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Tacho Time <span className="text-red-500">*</span>
              </label>
              <input
                type="number"
                step="0.1"
                required
                placeholder="0.0"
                className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
                value={formData.opening_tacho_time}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    opening_tacho_time: e.target.value,
                  })
                }
              />
            </div>
          </div>
        </div>
      </div>

      {/* Settings */}
      <div className="bg-white p-6 rounded-xl border shadow-sm space-y-6">
        <div className="flex items-center gap-2 mb-4">
          <h3 className="text-lg font-semibold text-gray-900">Settings</h3>
          <div className="group relative">
            <Info className="h-4 w-4 text-gray-400" />
            <div className="hidden group-hover:block absolute left-full ml-2 p-2 bg-gray-800 text-white text-xs rounded w-48">
              Configure operational settings and tracking preferences
            </div>
          </div>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Engine Count
            </label>
            <select
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              value={formData.engine_count}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  engine_count: parseInt(e.target.value),
                })
              }
            >
              {Array.from({ length: 20 }, (_, i) => i + 1).map((num) => (
                <option key={num} value={num}>
                  {num}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Total Time Method
            </label>
            <select
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              value={formData.total_time_method}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  total_time_method: e.target.value as TotalTimeMethod,
                })
              }
            >
              <option value="Tacho">Tacho</option>
              <option value="Tacho Less 10%">Tacho Less 10%</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700">
              Fuel Consumption (L/hr)
            </label>
            <input
              type="number"
              placeholder="0"
              className="mt-1 block w-full rounded-lg border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 transition-colors"
              value={formData.fuel_consumption}
              onChange={(e) =>
                setFormData({
                  ...formData,
                  fuel_consumption: parseInt(e.target.value),
                })
              }
            />
          </div>
        </div>

        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">
              Recording Options
            </h4>
            <label className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors cursor-pointer">
              <input
                type="checkbox"
                id="record_airswitch"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={formData.record_airswitch}
                onChange={(e) =>
                  setFormData({
                    ...formData,
                    record_airswitch: e.target.checked,
                  })
                }
              />
              <span className="text-sm text-gray-700">Record Airswitch</span>
            </label>
            <label className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors cursor-pointer">
              <input
                type="checkbox"
                id="record_hobbs"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={formData.record_hobbs}
                onChange={(e) =>
                  setFormData({ ...formData, record_hobbs: e.target.checked })
                }
              />
              <span className="text-sm text-gray-700">Record Hobbs</span>
            </label>
            <label className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors cursor-pointer">
              <input
                type="checkbox"
                id="record_tacho"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={formData.record_tacho}
                onChange={(e) =>
                  setFormData({ ...formData, record_tacho: e.target.checked })
                }
              />
              <span className="text-sm text-gray-700">Record Tacho</span>
            </label>
          </div>

          <div className="space-y-4 bg-gray-50 p-4 rounded-lg">
            <h4 className="font-medium text-gray-900 mb-3">
              Availability Settings
            </h4>
            <label className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors cursor-pointer">
              <input
                type="checkbox"
                id="is_online"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={formData.is_online}
                onChange={(e) =>
                  setFormData({ ...formData, is_online: e.target.checked })
                }
              />
              <span className="text-sm text-gray-700">Online</span>
            </label>
            <label className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors cursor-pointer">
              <input
                type="checkbox"
                id="for_hire"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={formData.for_hire}
                onChange={(e) =>
                  setFormData({ ...formData, for_hire: e.target.checked })
                }
              />
              <span className="text-sm text-gray-700">For Hire</span>
            </label>
            <label className="flex items-center gap-3 p-2 hover:bg-white rounded transition-colors cursor-pointer">
              <input
                type="checkbox"
                id="for_ato"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                checked={formData.for_ato}
                onChange={(e) =>
                  setFormData({ ...formData, for_ato: e.target.checked })
                }
              />
              <span className="text-sm text-gray-700">For ATO</span>
            </label>
          </div>
        </div>
      </div>

      {/* Form Actions */}
      <div className="flex justify-end gap-3 pt-6 border-t">
        <button
          type="button"
          onClick={onCancel}
          className="px-6 py-2 text-gray-700 bg-white border border-gray-300 rounded-lg hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 transition-colors"
        >
          Cancel
        </button>
        <button
          type="submit"
          className="px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 transition-colors"
        >
          Create Aircraft
        </button>
      </div>
    </form>
  );
};

export default AircraftInitForm;
