import { siteConfig } from "@/data/portfolio";
import { fetchGitHubRepos, parseGithubUsername } from "@/lib/github";
import { HomePage } from "@/views/HomePage";

/**
 * Loads public GitHub repos server-side (revalidates hourly).
 * Set `githubUsername` or a real `githubUrl` in portfolio.ts.
 */

export default async function Page() {
  const username =
    siteConfig.githubUsername?.trim() || parseGithubUsername(siteConfig.githubUrl) || "";
  const githubRepos = username ? await fetchGitHubRepos(username) : [];

  return <HomePage githubRepos={githubRepos} />;
}
