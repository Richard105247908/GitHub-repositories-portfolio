import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import RepositoryList from './components/RepositoryList';
import RepositoryDetails from './components/RepositoryDetails';
import ErrorBoundary from './components/ErrorBoundary';
import NotFound from './components/NotFound';

const Header = () => (
  <header className="bg-blue-500 text-white p-4">
    <div className="container mx-auto">
      <h1 className="text-xl font-bold">GitHub Portfolio</h1>
    </div>
  </header>
);

const Footer = () => (
  <footer className="bg-gray-800 text-white p-4 mt-8">
    <div className="container mx-auto text-center">
      <p>&copy; 2024 GitHub Portfolio. All rights reserved.</p>
    </div>
  </footer>
);

const App = () => {
  return (
    <Router>
      <Header />
      <main className="flex-grow">
        <ErrorBoundary>
          <Routes>
            <Route path="/" element={<RepositoryList />} />
            <Route path="/repo/:repoName" element={<RepositoryDetails />} />
            <Route path="*" element={<NotFound />} />
          </Routes>
        </ErrorBoundary>
      </main>
      <Footer />
    </Router>
  );
};

export default App;
