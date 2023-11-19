import React from 'react';
import './App.css';
import ChartNotes from './ChartNotes/ChartNotes';
/* import WorldMapChart from './charts/WorldMapChart.js'; */
/* import data from './GeoJson/GeoJson.json' */

function App() {
  return (
    <div className="App">
      <ChartNotes />
     {/*  <WorldMapChart data={data} /> */}
    </div>
  );
}

export default App;
