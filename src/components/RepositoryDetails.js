import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { fetchRepositoryDetails } from '../services/githubService';

const RepositoryDetails = () => {
  const { repoName } = useParams();
  const [repository, setRepository] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadRepositoryDetails = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await fetchRepositoryDetails(repoName);
        setRepository(data);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    loadRepositoryDetails();
  }, [repoName]);

  if (loading) return <p className="loading">Loading...</p>;
  if (error) return <p className="error">Error: {error}</p>;
  if (!repository) return <p className="loading">No repository found</p>;

  return (
    <div className="container">
      <div className="repo-details">
        <h2>{repository.name}</h2>
        <p>{repository.description}</p>
        <p>Stars: {repository.stargazers_count}</p>
        <p>Forks: {repository.forks_count}</p>
        <p>Open Issues: {repository.open_issues_count}</p>
      </div>
    </div>
  );
};

export default RepositoryDetails;
