import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';

const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<RepositoryList />} />
        <Route path="/repo/:repoName" element={<RepositoryDetails />} />
        {/* Add additional routes as needed */}
      </Routes>
    </Router>
  );
};

export default App;
