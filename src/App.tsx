import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Intro from './pages/Intro';
import LabStudio from './pages/LabStudio';
import SoftGreen from './pages/SoftGreen';
import Store from './pages/Store';

function App() {
  return (
    <>
      <div className="noise-overlay" />
      <Router>
        <Routes>
          <Route path="/" element={<Intro />} />
          <Route path="/lab" element={<LabStudio />} />
          <Route path="/green" element={<SoftGreen />} />
          <Route path="/store" element={<Store />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
