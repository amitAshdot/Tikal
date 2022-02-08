import React, { lazy, Suspense } from 'react';
//Layout component
import Loading from './components/Loading';
//context components
import ApppState from './context/app/appState';

const TaskOne = lazy(() => import('./components/TaskOne'))
const TaskTwo = lazy(() => import('./components/TaskTwo'))
const App = () => {
  return (
    <ApppState >
      <Suspense fallback={<Loading />}>
        <div className="App">
          <TaskOne />
          <TaskTwo />
          {/* <Loading /> */}
        </div>
      </Suspense>
    </ApppState>
  );
}

export default App;
