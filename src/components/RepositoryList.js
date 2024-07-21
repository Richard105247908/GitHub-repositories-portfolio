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
  const [hasMore, setHasMore] = useState(true); // to track if there are more pages to load

  useEffect(() => {
    const loadRepositories = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRepositories(page, query);
        if (data.length === 0) {
          setHasMore(false); // no more data to load
        } else {
          setRepositories(data);
        }
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    loadRepositories();
  }, [page, query]);

  const handleNextPage = () => {
    if (hasMore) {
      setPage(page + 1);
    }
  };

  return (
    <div className="container mx-auto px-4">
      <h1 className="text-3xl font-bold mb-6 text-center">GitHub Repositories</h1>
      <div className="image-container mb-4">
        <img src={githubImage} alt="GitHub" className="github-image mx-auto" />
      </div>
      <SearchFilter query={query} setQuery={setQuery} />
      <div className="pagination flex justify-between my-4">
        <button
          onClick={() => setPage(page - 1)}
          disabled={page === 1}
          className="button bg-gray-300 hover:bg-gray-400 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Previous
        </button>
        <button
          onClick={handleNextPage}
          disabled={!hasMore}
          className="button bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded disabled:opacity-50"
        >
          Next
        </button>
      </div>
      {loading && <p className="text-center py-4">Loading...</p>}
      {error && <p className="text-center py-4 text-red-500">Error: {error}</p>}
      <div className="repo-list grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {repositories.length > 0 ? (
          repositories.map((repo) => (
            <div key={repo.id} className="repo-item bg-white shadow rounded-lg p-4 transition duration-300 ease-in-out transform hover:scale-105">
              <Link to={`/repo/${repo.name}`}>
                <h2 className="text-xl font-semibold">{repo.name}</h2>
                <p className="text-gray-700">{repo.description}</p>
              </Link>
            </div>
          ))
        ) : (
          !loading && <p className="text-center py-4">No repositories found</p>
        )}
      </div>
    </div>
  );
};

export default RepositoryList;
