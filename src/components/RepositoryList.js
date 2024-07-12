import React, { useEffect, useState } from 'react';
import { fetchRepositories } from '../services/githubService';
import { Link } from 'react-router-dom';
import SearchFilter from './SearchFilter';
import githubImage from '../githubImage/kisspng-github-.jpg';

const RepositoryList = () => {
  const [repositories, setRepositories] = useState([]);
  const [page, setPage] = useState(1);
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRepositories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRepositories(page, query);
        setRepositories(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    loadRepositories();
  }, [page, query]);

  return (
    <div className="container">
      <h1 className="header">GitHub Repositories</h1>
      <div className="image-container mb-4">
        <img src={githubImage} alt="GitHub" className="github-image mx-auto" />
      </div>
      <SearchFilter query={query} setQuery={setQuery} />
      <div className="pagination">
        <button onClick={() => setPage(page - 1)} disabled={page === 1} className="button">
          Previous
        </button>
        <button onClick={() => setPage(page + 1)} className="button">
          Next
        </button>
      </div>
      {loading && <p className="loading">Loading...</p>}
      {error && <p className="error">Error: {error}</p>}
      <div className="repo-list">
        {repositories.map((repo) => (
          <div key={repo.id} className="repo-item">
            <Link to={`/repo/${repo.name}`}>
              <h2>{repo.name}</h2>
              <p>{repo.description}</p>
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default RepositoryList;
