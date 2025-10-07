import React from 'react';
import { FoodItem } from '../../types/FoodItem';

// TODO: Fetch and display the list of recorded items for the selected day
// TODO: Implement the functionality to add, edit, and delete food items

interface DailyViewProps {
  date: Date;
}

export const DailyView: React.FC<DailyViewProps> = ({ date }) => {
  const [items, setItems] = React.useState<FoodItem[]>([]);

  React.useEffect(() => {
    // TODO: Fetch the food items for the selected date from the FoodService
    console.log('Fetching items for', date);
  }, [date]);

  return (
    <div>
      <h3>Daily View - {date.toDateString()}</h3>
      {/* Placeholder for the list of recorded items */}
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            {item.name} - {item.calories} calories
          </li>
        ))}
      </ul>
    </div>
  );
};
