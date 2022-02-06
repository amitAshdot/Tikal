import React from 'react';
import './App.css';
import Testa from './components/Testa';
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
        <Testa />
      </div>
    </VehicleState>
  );
}

export default App;
