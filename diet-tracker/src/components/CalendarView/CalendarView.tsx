import React from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';

// TODO: Display calorie counter and small icons of what was eaten that day

interface CalendarViewProps {
  selectedDate: Date;
  setSelectedDate: (date: Date) => void;
}

export const CalendarView: React.FC<CalendarViewProps> = ({
  selectedDate,
  setSelectedDate,
}) => {
  const onChange = (value: any) => {
    // The type for value is `Date | [Date, Date] | null`.
    // We are not using ranges, so we only care about the Date type.
    if (value instanceof Date) {
      setSelectedDate(value);
    }
  };

  return (
    <div>
      <h2>Calendar View</h2>
      <Calendar onChange={onChange} value={selectedDate} />
    </div>
  );
};
