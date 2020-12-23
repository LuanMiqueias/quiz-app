import React from 'react';
import Routes from './pages/Routes';
import { GlobalStorage } from './pages/GlobalStorage';
function App() {
  return (
    <GlobalStorage>
      <Routes />
    </GlobalStorage>
  );
}

export default App;
