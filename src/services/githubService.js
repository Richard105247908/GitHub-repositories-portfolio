// src/services/githubService.js
const GITHUB_USERNAME = 'Richard105247908';

export const fetchRepositories = async (page = 1, query = '') => {
  const url = query
    ? `https://api.github.com/search/repositories?q=user:${GITHUB_USERNAME}+${query}&page=${page}&per_page=10`
    : `https://api.github.com/users/${GITHUB_USERNAME}/repos?page=${page}&per_page=10`;
  const response = await fetch(url);
  const data = await response.json();
  return query ? data.items : data;
};

export const fetchRepositoryDetails = async (repoName) => {
  const response = await fetch(`https://api.github.com/repos/${GITHUB_USERNAME}/${repoName}`);
  const data = await response.json();
  return data;
};
