// src/services/githubService.js
const GITHUB_USERNAME = 'Richard105247908';

export const fetchRepositories = async (page = 1, query = '') => {
  const response = await fetch(`https://api.github.com/users/${GITHUB_USERNAME}/repos?page=${page}&per_page=10&q=${query}`);
  if (!response.ok) {
    throw new Error('Failed to fetch repositories');
  }
  const data = await response.json();
  return data;
};

export const fetchRepositoryDetails = async (repoName) => {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
  if (!response.ok) {
    throw new Error('Failed to fetch repository details');
  }
  const data = await response.json();
  return data;
};
