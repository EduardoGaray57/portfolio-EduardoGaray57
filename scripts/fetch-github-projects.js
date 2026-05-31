#!/usr/bin/env node
// Build-time script: fetch public repos from GitHub API → src/assets/data/projects.json
// Usage: node scripts/fetch-github-projects.js
// Requires Node 18+ (native fetch).
// Optional: GITHUB_TOKEN environment variable for higher rate limit (5000/hr vs 60/hr).

const fs = require('fs');
const path = require('path');

const GITHUB_USER = 'EduardoGaray57';
const API_URL = `https://api.github.com/users/${GITHUB_USER}/repos?per_page=30&sort=updated&direction=desc`;
const OUTPUT_FILE = path.join(__dirname, '..', 'src', 'assets', 'data', 'projects.json');

async function main() {
  const headers = {
    Accept: 'application/vnd.github.v3+json',
  };

  const token = process.env.GITHUB_TOKEN;
  if (token) {
    headers.Authorization = `Bearer ${token}`;
  }

  console.log(`Fetching GitHub repos for ${GITHUB_USER}...`);

  const response = await fetch(API_URL, { headers });

  if (!response.ok) {
    const remaining = response.headers.get('X-RateLimit-Remaining') ?? 'unknown';
    console.error(`GitHub API error: ${response.status} ${response.statusText}`);
    console.error(`Rate limit remaining: ${remaining}`);

    // Fallback: keep existing file if it exists
    if (fs.existsSync(OUTPUT_FILE)) {
      console.log('Using existing projects.json as fallback');
      process.exit(0);
    }

    console.error('No existing projects.json found — build will lack project data');
    process.exit(1);
  }

  const repos = await response.json();
  const remaining = response.headers.get('X-RateLimit-Remaining') ?? 'unknown';
  console.log(`Fetched ${repos.length} repos. Rate limit remaining: ${remaining}`);

  const mapped = repos.map((repo) => ({
    id: repo.id,
    name: repo.name,
    full_name: repo.full_name,
    html_url: repo.html_url,
    description: repo.description,
    language: repo.language,
    stargazers_count: repo.stargazers_count,
    forks_count: repo.forks_count,
    fork: repo.fork,
    created_at: repo.created_at,
    updated_at: repo.updated_at,
    pushed_at: repo.pushed_at,
    homepage: repo.homepage,
    topics: repo.topics ?? [],
    license: repo.license
      ? { key: repo.license.key, name: repo.license.spdx_id || repo.license.name }
      : null,
  }));

  // Sort by stars descending
  mapped.sort((a, b) => b.stargazers_count - a.stargazers_count);

  const output = {
    lastFetched: new Date().toISOString(),
    repos: mapped,
  };

  const dir = path.dirname(OUTPUT_FILE);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }

  fs.writeFileSync(OUTPUT_FILE, JSON.stringify(output, null, 2), 'utf-8');
  console.log(`✓ Written ${mapped.length} repos to ${OUTPUT_FILE}`);
}

main().catch((err) => {
  console.error('Fatal error:', err);
  process.exit(1);
});
