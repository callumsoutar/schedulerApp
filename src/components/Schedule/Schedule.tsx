import React from 'react';
import ScheduleHeader from './ScheduleHeader';
import ScheduleGrid from './ScheduleGrid';

const Schedule = () => {
  return (
    <div className="p-6">
      <ScheduleHeader />
      <ScheduleGrid />
    </div>
  );
};

export default Schedule;