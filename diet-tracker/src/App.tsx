import React from 'react';
import './App.css';
import { CalendarView } from './components/CalendarView/CalendarView';
import { DailyView } from './components/DailyView/DailyView';
import { SummaryView } from './components/SummaryView/SummaryView';

// TODO: Add routing to switch between different views
// TODO: Implement a proper login flow
// TODO: Create a more appealing UI design

function App() {
  const [selectedDate, setSelectedDate] = React.useState(new Date());

  return (
    <div className="App">
      <header className="App-header">
        <h1>Diet Tracker</h1>
        {/* TODO: Add a fake login button and a todo to integrate with google login */}
      </header>
      <main>
        <CalendarView
          selectedDate={selectedDate}
          setSelectedDate={setSelectedDate}
        />
        <DailyView date={selectedDate} />
        <SummaryView />
      </main>
    </div>
  );
}

export default App;
