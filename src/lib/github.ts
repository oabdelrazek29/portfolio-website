/**
 * Fetches public repositories for the portfolio grid.
 * GitHub requires a User-Agent header on all API requests.
 * Optional: set GITHUB_TOKEN in .env for higher rate limits (server-side only).
 */

export type GitHubRepo = {
  id: number;
  name: string;
  description: string | null;
  html_url: string;
  language: string | null;
  stargazers_count: number;
  fork: boolean;
  topics?: string[];
};

function getAuthHeader(): Record<string, string> {
  const token = process.env.GITHUB_TOKEN;
  if (token) return { Authorization: `Bearer ${token}` };
  return {};
}

/** Derive username from https://github.com/username */
export function parseGithubUsername(url: string): string | null {
  try {
    const u = new URL(url);
    if (u.hostname !== "github.com") return null;
    const parts = u.pathname.split("/").filter(Boolean);
    return parts[0] ?? null;
  } catch {
    return null;
  }
}

export async function fetchGitHubRepos(username: string): Promise<GitHubRepo[]> {
  if (!username.trim()) return [];

  const url = `https://api.github.com/users/${encodeURIComponent(username)}/repos?sort=updated&per_page=12&type=owner`;

  const res = await fetch(url, {
    next: { revalidate: 3600 },
    headers: {
      Accept: "application/vnd.github+json",
      "User-Agent": "Omar-Portfolio-Site",
      "X-GitHub-Api-Version": "2022-11-28",
      ...getAuthHeader(),
    },
  });

  if (!res.ok) return [];

  const data = (await res.json()) as GitHubRepo[];
  if (!Array.isArray(data)) return [];

  return data.filter((r) => !r.fork);
}
