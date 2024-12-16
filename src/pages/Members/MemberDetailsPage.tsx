import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useMemberStore } from '../../store/useMemberStore';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const TABS = [
  { id: 'contact', label: 'Contact Details' },
  { id: 'membership', label: 'Membership Details' },
  { id: 'pilot', label: 'Pilot Details' },
  { id: 'account', label: 'Account' },
  { id: 'bookings', label: 'Bookings' },
  { id: 'history', label: 'Flight History' },
  { id: 'comments', label: 'Instructor Comments' },
  { id: 'mailing', label: 'Mailing Lists' },
  { id: 'permissions', label: 'Permissions' },
];

const MemberDetailsPage = () => {
  const { id } = useParams<{ id: string }>();
  const { getMember } = useMemberStore();
  const [activeTab, setActiveTab] = useState('contact');
  const [scrollPosition, setScrollPosition] = useState(0);

  const member = getMember(id!);
  const tabsRef = React.useRef<HTMLDivElement>(null);

  const scrollTabs = (direction: 'left' | 'right') => {
    if (tabsRef.current) {
      const scrollAmount = 200;
      const newPosition =
        direction === 'left'
          ? Math.max(0, scrollPosition - scrollAmount)
          : Math.min(
              tabsRef.current.scrollWidth - tabsRef.current.clientWidth,
              scrollPosition + scrollAmount
            );

      tabsRef.current.scrollTo({ left: newPosition, behavior: 'smooth' });
      setScrollPosition(newPosition);
    }
  };

  if (!member) return null;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="py-6">
            <h1 className="text-2xl font-bold text-gray-900">{member.name}</h1>
            <p className="text-sm text-gray-500">{member.email}</p>
          </div>

          <div className="relative flex items-center">
            <button
              onClick={() => scrollTabs('left')}
              className="absolute left-0 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-50"
            >
              <ChevronLeft className="h-5 w-5 text-gray-600" />
            </button>

            <div
              ref={tabsRef}
              className="flex space-x-8 overflow-x-hidden scroll-smooth mx-10"
            >
              {TABS.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`pb-4 px-1 border-b-2 font-medium text-sm whitespace-nowrap flex-shrink-0 ${
                    activeTab === tab.id
                      ? 'border-blue-500 text-blue-600'
                      : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>

            <button
              onClick={() => scrollTabs('right')}
              className="absolute right-0 z-10 p-2 bg-white shadow-md rounded-full hover:bg-gray-50"
            >
              <ChevronRight className="h-5 w-5 text-gray-600" />
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="bg-white rounded-lg shadow p-6">
          <p className="text-gray-500">
            Tab content for {activeTab} will be implemented soon.
          </p>
        </div>
      </div>
    </div>
  );
};

export default MemberDetailsPage;
