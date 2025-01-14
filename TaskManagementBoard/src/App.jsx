import React from 'react';
import { SprintProvider } from './context/SprintContext';
import { NavBar, TaskBoard } from './components';


function App() {
  return (
    <SprintProvider>
      <NavBar />
      <TaskBoard />
    </SprintProvider>
  );
}

export default App;
