import React, { lazy, Suspense } from 'react';
import './App.css';
// import TaskOne from './components/TaskOne';
// import TaskTwo from './components/TaskTwo';
//Layout component
import Loading from './components/Loading';

//context components
import VehicleState from './context/vehicle/vehicleState';

const TaskOne = lazy(() => import('./components/TaskOne'))
const TaskTwo = lazy(() => import('./components/TaskTwo'))
const App = () => {
  return (
    <VehicleState >
      <Suspense fallback={<Loading />}>
        <div className="App">
          <TaskOne />
          <TaskTwo />
          {/* <Loading /> */}
        </div>
      </Suspense>
    </VehicleState>
  );
}

export default App;
