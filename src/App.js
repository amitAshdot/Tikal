import React from 'react';
import './App.css';
import TaskOne from './components/TaskOne';
import TaskTwo from './components/TaskTwo';
//Layout component
// import Navbar from "./components/layouts/Navbar";

//context components
import VehicleState from './context/vehicle/vehicleState';

const App = () => {
  return (
    <VehicleState >
      <div className="App">
        <header className="App-header">
          header
        </header>
        balh
        {/* <TaskOne /> */}
        <TaskTwo />
      </div>
    </VehicleState>
  );
}

export default App;
