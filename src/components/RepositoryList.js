import React, { useEffect, useState } from 'react';
import { fetchRepositories } from '../services/githubService';

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
    <div>
      <input
        type="text"
        placeholder="Search Repositories"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
      />
      <button onClick={() => setPage(page - 1)} disabled={page === 1}>
        Previous
      </button>
      <button onClick={() => setPage(page + 1)}>
        Next
      </button>
      {loading && <p>Loading...</p>}
      {error && <p>Error: {error}</p>}
      <ul>
        {repositories.map((repo) => (
          <li key={repo.id}>{repo.name}</li>
        ))}
      </ul>
    </div>
  );
};

export default RepositoryList;
